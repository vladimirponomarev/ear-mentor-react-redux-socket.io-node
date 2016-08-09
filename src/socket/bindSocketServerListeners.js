import { isSettingsDataValid } from '../utils/validator';
import { encrypt } from '../utils/encryptor';
import calculateScorePoints from '../utils/calculateScorePoints';
import generateMusicalInterval from '../utils/generateMusicalInterval';
import config from '../../config';
import * as musicalNotes from '../constants/musicalNotes';

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
  const rating = [];

  function cleanUpFromPlayer(player) {
    const playerInRating = rating.find(one => one.id === player.id);
    rating.splice(rating.indexOf(playerInRating), 1);

    players.splice(players.indexOf(player), 1);
  }

  function processIncorrectAnswer(player, socket) {
    const maxTryCount = 2;

    if (player.question.tryCount === maxTryCount) {
      return db.parallelize(() => {
        const query = "UPDATE players SET score = ?, updatedAt = datetime('now') WHERE id = ?";
        const stml = db.prepare(query);
        stml.run([player.score, player.id], () => {
          cleanUpFromPlayer(player);

          socket.emit('game_over', player.score);
        });
      });
    }

    return socket.emit('confirm_incorrect_answer');
  }

  function processCorrectAnswer(player, socket) {
    const playerInRating = rating.find(one => one.id === player.id);
    if (!playerInRating) {
      rating.push({
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

  io.sockets.on('connection', (socket) => {
    socket.on('game_start', (settings) => {
      const validationResult = isSettingsDataValid(settings);
      if (!validationResult.isValid) {
        return socket.emit('validation_error', validationResult.errors);
      }

      return db.parallelize(() => {
        const stml = db.prepare("INSERT INTO players (name) VALUES (?)");
        stml.run(settings.name, () => {
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

    socket.on('answer', (answer) => {
      const player = players.find(one => one.socketId === socket.id);
      if (!player || player.question.number === 0) {
        return socket.emit('bad_request', 'Invalid action.');
      }

      const isAnswerCorrect = player.question.answer === (player.question.question + answer);

      if (isAnswerCorrect) {
        player.score += calculateScorePoints(player.settings);
        return processCorrectAnswer(player, socket);
      }

      player.question.tryCount++;
      return processIncorrectAnswer(player, socket);
    });
  });
}
