/* eslint-disable no-console, react/jsx-filename-extension */
import Express from 'express';
import socketIoServer from 'socket.io';
import sqlite3 from 'sqlite3';
import React from 'react';
import favicon from 'serve-favicon';
import ReactDom from 'react-dom/server';
import path from 'path';
import colors from 'colors'; // eslint-disable-line no-unused-vars
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './store/index';
import schema from './schema';
import config from '../config';
import Encryptor from './utils/Encryptor';
import bindSocketServerListeners from './socket/bindSocketServerListeners';
import NotFoundPage from './components/NotFoundPage.jsx';
import getRoutes from './routes.jsx';


export default (appOptions) => {
  const db = new sqlite3.Database(config.db);
  const app = new Express();
  appOptions.forEach((option) => {
    if (option.args) {
      app.use(option.middleware(...option.args));
    } else {
      app.use(option.middleware());
    }
  });
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, './views'));
  app.use(Express.static(config.paths.staticDirectoryDest));
  app.use(favicon(path.join(config.paths.staticDirectoryDest, './favicon.ico')));


  // assets
  app.get('/data/:filename', (req, res) => {
    try {
      const text = Encryptor.decrypt(config.secretKey, req.params.filename);

      const chunks = text.split('.');
      const instrument = chunks[0].toLowerCase();
      const note = chunks[1].toLowerCase().replace('#', '-sharp');
      const file = path.join(config.paths.staticDirectoryDest, `./audio/${instrument}/${note}.mp3`);

      return res.sendFile(file);
    } catch (e) {
      return res.status(404);
    }
  });

  // universal routing and rendering
  app.get('*', (req, res) => {
    const store = configureStore();

    match({
      routes: getRoutes(store),
      location: req.url
    }, (err, redirectLocation, renderProps) => {
      // in case of an error, display the error message
      if (err) return res.status(500).send(err.message);

      // in case of redirect propagate the redirect to the browser
      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      // generate the React markup for the current route
      let markup;
      if (renderProps) {
        // if the current route matched we have renderProps
        markup = ReactDom.renderToString(
          <Provider store={store} key="provider">
            <RouterContext {...renderProps} />
          </Provider>
        );
      } else {
        // otherwise we can render a 404 page
        markup = ReactDom.renderToString(<NotFoundPage />);
        res.status(404);
      }

      return res.render('index', { markup });
    });
  });


  // create the database if needed, then start the server
  return new Promise((resolve) => {
    db.parallelize(() => {
      db.run(schema, (err) => {
        if (err) throw err;

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
    console.log(`The server is listening on ${address.port} port.`.green);
  }).catch((e) => {
    console.error(String(e).red);
  });
};

