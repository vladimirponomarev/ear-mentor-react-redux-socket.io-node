/* eslint-disable no-console */
import express from 'express';
import socketIoServer from 'socket.io';
import sqlite3 from 'sqlite3';
import path from 'path';
import colors from 'colors'; // eslint-disable-line no-unused-vars
import { decrypt } from '../utils/encryptor';
import schema from '../schema';
import bindSocketServerListeners from '../socket/bindSocketServerListeners';
import config from '../../config';


const db = new sqlite3.Database(config.db);
const app = express();
app.get('/data/:filename', (req, res) => {
  try {
    const text = decrypt(config.secretKey, req.params.filename);
    const chunks = text.split('.');
    const instrument = chunks[0].toLowerCase();
    const note = chunks[1].toLowerCase().replace('#', '-sharp');
    const file = path.join(config.paths.staticDirectoryDest, `./audio/${instrument}/${note}.mp3`);

    return res.sendFile(file);
  } catch (e) {
    return res.status(404);
  }
});


export default app;

export function startServer() {
  return new Promise((resolve, reject) => {
    db.parallelize(() => {
      db.run(schema, (err) => {
        if (err) reject(err);

        resolve();
      });
    });
  }).then(() => new Promise((resolve, reject) => {
    const server = app.listen(config.port);
    const io = socketIoServer.listen(server);
    bindSocketServerListeners({ io, db });

    server.on('listening', () => {
      resolve(server.address());
    });

    server.on('error', (err) => {
      reject(err);
    });
  })).then((address) => {
    console.log(`The server is listening on ${address.port} port.`);
  }).catch((e) => {
    console.error(String(e).red);
  });
}

