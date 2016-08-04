/* eslint-disable no-console */
import express from 'express';
import socketIoServer from 'socket.io';
import sqlite3 from 'sqlite3';
import colors from 'colors'; // eslint-disable-line no-unused-vars
import schema from '../schema';
import bindSocketServerListeners from '../socket/bindSocketServerListeners';
import config from '../../config';


const app = express();
const db = new sqlite3.Database(config.db);

export default app;

export function startServer() {
  return new Promise((resolve, reject) => {
    db.parallelize(() => {
      db.run(schema, (err) => {
        if (err) reject(err);

        resolve();
      });
    });
  }).then(() => {
    return new Promise((resolve, reject) => {
      const server = app.listen(config.port);
      const io = socketIoServer.listen(server);
      bindSocketServerListeners({ io, db });

      server.on('listening', () => {
        resolve(server.address());
      });

      server.on('error', (err) => {
        reject(err);
      });
    });
  }).then((address) => {
    console.log(`The server is listening on ${address.port} port.`);
  }).catch((e) => {
    console.error(String(e).red);
  });
}

