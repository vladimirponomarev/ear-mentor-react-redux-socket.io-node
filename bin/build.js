import fs from 'fs';
import path from 'path';
import rmdir from 'rmdir';
import webpack from 'webpack';
import * as webpackConfigs from '../webpack/config.prod.js';

const bundleServer = new Promise((resolve, reject) => {
  webpack(webpackConfigs.server).run((err, stats) => {
    if (err) {
      reject(err);
    }

    resolve(stats);
  });
});

const bundleClient = new Promise((resolve, reject) => {
  webpack(webpackConfigs.client).run((err, stats) => {
    if (err) {
      reject(err);
    }

    resolve(stats);
  });
});


Promise.all([bundleServer, bundleClient]).then((values) => {
  console.log(values);
});
