/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import express from 'express';
import webpack from 'webpack'; //
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import app, { startServer } from './server/index.js';
import webpackConfig from '../webpack/config.development.js';

const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));
app.use(express.static(path.join(__dirname, './static')));

startServer();
