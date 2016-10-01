import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack/config.development.js';
import startApp from '../src/server.js';

const compiler = webpack(webpackConfig);
const appOptions = [
  {
    middleware: webpackDevMiddleware,
    args: [compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }]
  },
  {
    middleware: webpackHotMiddleware,
    args: [compiler]
  }
];

startApp(appOptions);

