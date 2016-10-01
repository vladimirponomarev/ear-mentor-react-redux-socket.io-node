import compression from 'compression';
import startApp from './server.js';

const appOptions = [
  {
    middleware: compression
  }
];

startApp(appOptions);

