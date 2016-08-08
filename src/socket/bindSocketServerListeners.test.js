/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import socketIoServer from 'socket.io';
import socketIoClient from 'socket.io-client';
import expect from 'expect';
import sqlite3 from 'sqlite3';
import bindSocketServerListeners from './bindSocketServerListeners';
import config from '../../config';
import * as musicalInstruments from '../constants/musicalInstruments';
import * as musicalIntervals from '../constants/musicalIntervals';
import * as musicalIntervalDirections from '../constants/musicalIntervalDirections';


describe('Testing  server socket listeners', () => {
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

  it("should get a error when a question has been requested without a game start.", (done) => {
    const io = socketIoClient.connect(socketUrl);

    io.emit('question_request');

    io.on('bad_request', (payload) => {
      expect(payload.toLowerCase()).toContain('invalid');
      io.disconnect();
      done();
    });
  });

  it("should get a question due to a game hasn't been started", (done) => {
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
      expect(payload).toIncludeKeys(['firstNote', 'secondNote']);
      done();
    });
  });
});
