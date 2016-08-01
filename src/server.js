import express from 'express';
import socketIoServer from 'socket.io';
import sqlite3 from 'sqlite3';
import config from '../config';
import bindSocketServerListeners from './socket/bindSocketServerListeners';
import schemaQuery from 'schema';


const app = express();
const db = new sqlite3.Database(config.db);

new Promise((resolve) => {
  db.parallelize(() => {
    db.run(schemaQuery, () => {
      resolve();
    });
  });
}).then(() => {
  const server = app.listen(3000);
  const io = socketIoServer.listen(server);

  bindSocketServerListeners({
    io: io,
    db: db
  });
});

export default app;
