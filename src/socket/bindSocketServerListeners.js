import { isSettingsDataValid } from '../utils/validator';
import { encrypt } from '../utils/encryptor';
import calculateScorePoints from '../utils/calculateScorePoints';
import generateMusicalInterval from '../utils/generateMusicalInterval';
import config from '../../config';
import * as musicalNotes from '../constants/musicalNotes';
import * as periods from '../constants/periods';


function getSounds(settings) {
  const sounds = [];
  const min = musicalNotes.RANGE[settings.instrument].min;
  const max = musicalNotes.RANGE[settings.instrument].max;

  // encrypt note names to prevent cheating
  for (let i = min; i <= max; i++) {
    const value = `${settings.instrument}.${musicalNotes.NOTES[i]}`;
    const encrypted = encrypt(config.secretKey, value);

    sounds.push(`/data/${encrypted}.mp3`);
  }

  // randomize the sequence
  sounds.sort(() => Math.random() - Math.random());

  return sounds;
}


export default function (dependencies) {
  if (!dependencies.io) {
    throw new Error('The socket connection must be provided.');
  }

  if (!dependencies.db) {
    throw new Error('The database connection must be provided.');
  }

  const io = dependencies.io;
  const db = dependencies.db;
  const players = [];
  const ratingOfCurrentPlayers = [];
  const ratingEmitterInterval = 1000;
  const maxTryCount = 2;

  function cleanUpFromPlayer(player) {
    const playerInRating = ratingOfCurrentPlayers.find(one => one.id === player.id);
    ratingOfCurrentPlayers.splice(ratingOfCurrentPlayers.indexOf(playerInRating), 1);

    players.splice(players.indexOf(player), 1);
  }

  function processIncorrectAnswer(player, socket) {
    if (player.question.tryCount === maxTryCount) {
      return db.parallelize(() => {
        const query = "UPDATE players SET score = ?, updatedAt = datetime('now') WHERE id = ?";
        const stml = db.prepare(query);
        stml.run([player.score, player.id], () => {
          cleanUpFromPlayer(player);

          socket.emit('game_over');
        });
      });
    }

    return socket.emit('confirm_incorrect_answer');
  }

  function processCorrectAnswer(player, socket) {
    const playerInRating = ratingOfCurrentPlayers.find(one => one.id === player.id);
    if (!playerInRating) {
      ratingOfCurrentPlayers.push({
        id: player.id,
        name: player.settings.name,
        country: player.settings.country,
        score: player.score
      });
    } else {
      playerInRating.score = player.score;
    }

    return socket.emit('confirm_correct_answer', player.score);
  }

  setInterval(() => {
    io.sockets.emit('current_players', ratingOfCurrentPlayers);
  }, ratingEmitterInterval);

  io.sockets.on('connection', (socket) => {

    socket.once('disconnect', () => {
      const player = players.find(one => one.socketId === socket.id);
      if (!player) {
        return socket.disconnect();
      }

      const query = "UPDATE players SET score = ?, updatedAt = datetime('now') WHERE id = ?";
      const stml = db.prepare(query);

      return db.parallelize(() => {
        stml.run([player.score, player.id], () => {
          cleanUpFromPlayer(player);

          socket.disconnect();
        });
      });
    });

    socket.on('game_start', (settings) => {
      const validationResult = isSettingsDataValid(settings);
      if (!validationResult.isValid) {
        return socket.emit('validation_error', validationResult.errors);
      }

      return db.parallelize(() => {
        const query = 'INSERT INTO players (name, country) VALUES (?, ?)';
        const stml = db.prepare(query);
        stml.run([settings.name, settings.country], () => {
          const playerData = {
            socketId: socket.id,
            id: stml.lastID,
            question: {
              number: 0,
              question: 0,
              answer: 0,
              tryCount: 0
            },
            score: 0,
            settings
          };

          players.push(playerData);

          const payload = {
            sounds: getSounds(settings),
            playerId: playerData.id
          };

          socket.emit('confirm_game_start', payload);
        });
      });
    });

    socket.on('question_request', () => {
      const player = players.find(one => one.socketId === socket.id);
      if (!player || (!player.question.hasAnswered && player.question.number !== 0)) {
        return socket.emit('bad_request', 'Invalid action.');
      }

      const instrument = player.settings.instrument;
      const noteNumbers = generateMusicalInterval(player.settings);
      let firstNote = `${instrument}.${musicalNotes.NOTES[noteNumbers[0]]}`;
      let secondNote = `${instrument}.${musicalNotes.NOTES[noteNumbers[1]]}`;
      firstNote = encrypt(config.secretKey, firstNote);
      secondNote = encrypt(config.secretKey, secondNote);


      player.question.number++;
      player.question.question = noteNumbers[0];
      player.question.answer = noteNumbers[1];
      player.question.tryCount = 0;
      player.question.hasAnswered = false;

      const payload = {
        number: player.question.number,
        firstNote,
        secondNote
      };

      return socket.emit('question', payload);
    });


    socket.on('rating_request', (period) => {
      if (!Object.keys(periods).some(key => periods[key] === period)) {
        return socket.emit('bad_request', 'Invalid action.');
      }

      let startDate;
      switch (period) {
        case periods.MONTH:
          startDate = '-1 month';
          break;
        case periods.YEAR:
        default:
          startDate = '-1 year';
      }


      return db.parallelize(() => {
        const query = `SELECT * FROM players
                       WHERE updatedAt BETWEEN datetime('now', ?)
                         AND datetime('now', 'localtime')
                         AND score > 0
                       ORDER BY score DESC
                       LIMIT 50`;

        db.all(query, startDate, (err, rows) => {
          const ratingForPeriod = rows.map((row, index) => ({

            rank: index + 1,
            name: row.name,
            country: row.country,
            date: row.updatedAt,
            score: row.score
          }));

          return socket.emit('rating', ratingForPeriod);
        });
      });
    });

    socket.on('answer', (payload) => {
      const player = players.find(one => one.socketId === socket.id);
      if (!player || player.question.number === 0 || player.question.hasAnswered) {
        return socket.emit('bad_request', 'Invalid action.');
      }

      const answer = player.question.question + parseInt(payload, 10);
      const isAnswerCorrect = player.question.answer === answer;

      if (isAnswerCorrect && player.question.tryCount === 0) {
        player.score += calculateScorePoints(player.settings);
        player.question.hasAnswered = true;
        return processCorrectAnswer(player, socket);
      }

      player.question.tryCount++;
      return processIncorrectAnswer(player, socket);
    });
  });
}
