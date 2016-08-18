/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import socketIoServer from 'socket.io';
import socketIoClient from 'socket.io-client';
import expect from 'expect';
import sqlite3 from 'sqlite3';
import bindSocketServerListeners from './bindSocketServerListeners';
import { encrypt } from '../utils/encryptor';
import config from '../../config';
import * as musicalInstruments from '../constants/musicalInstruments';
import * as musicalIntervals from '../constants/musicalIntervals';
import * as musicalIntervalDirections from '../constants/musicalIntervalDirections';
import * as musicalNotes from '../constants/musicalNotes';


describe('Testing server socket listeners', () => {
  const socketUrl = `http://127.0.0.1:${config.port}`;
  const db = new sqlite3.Database(config.db);
  let app;
  let server;
  let socketIoServerConnection;

  before(() => {
    app = express();
    server = app.listen(config.port);
    socketIoServerConnection = socketIoServer.listen(server);

    bindSocketServerListeners({
      io: socketIoServerConnection,
      db
    });
  });

  it('should not pass the game settings validation when passed an empty object', (done) => {
    const io = socketIoClient.connect(socketUrl);
    io.emit('game_start', {});

    io.on('validation_error', (payload) => {
      expect(payload).toIncludeKeys(['intervals', 'instrument', 'directions', 'name', 'country']);
      done();
    });
  });

  it('should not pass the game settings validation when passed incorrect settings', (done) => {
    const io = socketIoClient.connect(socketUrl);
    io.emit('game_start', {
      directions: [],
      intervals: [musicalIntervals.MAJOR_SECOND],
      instrument: musicalInstruments.BASS,
      country: 'RU',
      name: 'John Doe'
    });

    io.on('validation_error', (payload) => {
      expect(payload).toIncludeKeys(['directions']);
      io.disconnect();

      done();
    });
  });

  it('should get game data when a game start confirmed', (done) => {
    const io = socketIoClient.connect(socketUrl);
    io.emit('game_start', {
      directions: [musicalIntervalDirections.ASC, musicalIntervalDirections.DESC],
      intervals: [musicalIntervals.MAJOR_SECOND],
      instrument: musicalInstruments.BASS,
      country: 'RU',
      name: 'John Doe'
    });

    io.on('confirm_game_start', (payload) => {
      expect(payload).toIncludeKeys(['playerId', 'sounds']);
      expect(payload.sounds.length).toBeGreaterThan(1);

      io.disconnect();
      done();
    });
  });

  it("should get a error when a question has been requested without a game start", (done) => {
    const io = socketIoClient.connect(socketUrl);

    io.emit('question_request');

    io.on('bad_request', (payload) => {
      expect(payload.toLowerCase()).toContain('invalid');
      io.disconnect();
      done();
    });
  });

  it("should get a question", (done) => {
    const io = socketIoClient.connect(socketUrl);

    io.emit('game_start', {
      directions: [musicalIntervalDirections.ASC, musicalIntervalDirections.DESC],
      intervals: [musicalIntervals.MAJOR_SECOND],
      instrument: musicalInstruments.BASS,
      country: 'RU',
      name: 'John Doe'
    });

    io.on('confirm_game_start', () => {
      io.emit('question_request');
    });

    io.on('question', (payload) => {
      expect(payload).toIncludeKeys(['number', 'firstNote', 'secondNote']);
      io.disconnect();
      done();
    });
  });

  it("should not get a new question without answering on a current one", (done) => {
    const io = socketIoClient.connect(socketUrl);

    io.emit('game_start', {
      directions: [musicalIntervalDirections.ASC, musicalIntervalDirections.DESC],
      intervals: [musicalIntervals.MAJOR_SECOND],
      instrument: musicalInstruments.BASS,
      country: 'RU',
      name: 'John Doe'
    });

    io.on('confirm_game_start', () => {
      io.emit('question_request');
    });

    io.on('question', () => {
      io.emit('question_request');
    });

    io.on('bad_request', (payload) => {
      expect(payload.toLowerCase()).toContain('invalid');
      io.disconnect();
      done();
    });
  });

  it('should not answer without getting a question', (done) => {
    const io = socketIoClient.connect(socketUrl);

    io.emit('game_start', {
      directions: [musicalIntervalDirections.ASC, musicalIntervalDirections.DESC],
      intervals: [musicalIntervals.MAJOR_SECOND],
      instrument: musicalInstruments.BASS,
      country: 'RU',
      name: 'John Doe'
    });

    io.on('confirm_game_start', () => {
      io.emit('answer', 100);
    });

    io.on('bad_request', (payload) => {
      expect(payload.toLowerCase()).toContain('invalid');
      io.disconnect();
      done();
    });
  });

  it("should get an increased score after giving a correct answer", (done) => {
    const io = socketIoClient.connect(socketUrl);
    const instrument = musicalInstruments.BASS;
    const notes = musicalNotes.NOTES.map((note) => {
      const value = `${instrument}.${note}`;
      const encrypted = encrypt(config.secretKey, value);

      return {
        encrypted,
        note
      };
    });

    io.emit('game_start', {
      directions: [musicalIntervalDirections.ASC, musicalIntervalDirections.DESC],
      intervals: [musicalIntervals.MAJOR_SECOND],
      instrument,
      country: 'RU',
      name: 'John Doe'
    });

    io.on('confirm_game_start', () => {
      io.emit('question_request');
    });

    io.on('question', (payload) => {
      let firstNoteIndex = 0;
      let secondNoteIndex = 0;

      notes.forEach((note) => {
        if (note.encrypted === payload.firstNote) {
          firstNoteIndex = musicalNotes.NOTES.indexOf(note.note);
        } else if (note.encrypted === payload.secondNote) {
          secondNoteIndex = musicalNotes.NOTES.indexOf(note.note);
        }
      });

      const answer = secondNoteIndex - firstNoteIndex;
      io.emit('answer', answer);
    });

    io.on('confirm_correct_answer', (score) => {
      expect(score).toBeGreaterThan(0);

      io.disconnect();
      done();
    });
  });

  it("should get an incorrect answer notice", (done) => {
    const io = socketIoClient.connect(socketUrl);

    io.emit('game_start', {
      directions: [musicalIntervalDirections.ASC, musicalIntervalDirections.DESC],
      intervals: [musicalIntervals.MAJOR_SECOND],
      instrument: musicalInstruments.BASS,
      country: 'RU',
      name: 'John Doe'
    });

    io.on('confirm_game_start', () => {
      io.emit('question_request');
    });

    io.on('question', () => {
      io.emit('answer', 99999);
    });

    io.on('confirm_incorrect_answer', () => {
      // we should get into this event, so here will be this simple assert
      expect(1).toEqual(1);

      io.disconnect();
      done();
    });
  });

  it("should end the game after two incorrect answers", (done) => {
    const io = socketIoClient.connect(socketUrl);

    io.emit('game_start', {
      directions: [musicalIntervalDirections.ASC, musicalIntervalDirections.DESC],
      intervals: [musicalIntervals.MAJOR_SECOND],
      instrument: musicalInstruments.BASS,
      country: 'RU',
      name: 'John Doe'
    });

    io.on('confirm_game_start', () => {
      io.emit('question_request');
    });

    io.on('question', () => {
      io.emit('answer', 99999);
    });

    io.on('confirm_incorrect_answer', () => {
      io.emit('answer', 99999);
    });

    io.on('game_over', () => {
      // we should get into this event, so here will be this simple assert
      expect(1).toEqual(1);
      io.disconnect();
      done();
    });
  });
});
