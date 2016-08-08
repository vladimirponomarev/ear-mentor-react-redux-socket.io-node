import { isSettingsDataValid } from '../utils/validator';
import { encrypt } from '../utils/encryptor';
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
      if (!player) {
        return socket.emit('bad_request', 'Invalid action.');
      }

      const payload = {
        firstNote: 1,
        secondNote: 2
      };

      return socket.emit('question', payload);
    });
  });
}
