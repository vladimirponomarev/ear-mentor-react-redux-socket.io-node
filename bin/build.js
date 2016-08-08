import path from 'path';
import fs from 'fs-extra';
import webpack from 'webpack';
import colors from 'colors'
import config from '../config';
import * as webpackConfigs from '../webpack/config.production.js';

const tasks = {
  'OLD_BUILD_CLEANING': 'The cleaning of an old build',
  'SERVER_BUNDLE': 'The server bundle',
  'CLIENT_BUNDLE': 'The client bundle',
  'STATIC_FILE_COPYING': 'The copying of static files'
};

const buildData = {
  taskCount: Object.keys(tasks).length,
  completedTaskCount: 0,
  startedAt: new Date(),
  completedAt: new Date()
};


console.log('Building...'.green);
const taskPromise = Promise.resolve().then(() => {
  return new Promise((resolve, reject) => {
    fs.remove(config.paths.distDirectory, (err) => {
      if (err) return reject(err);

      const index = ++buildData.completedTaskCount;
      const total = buildData.taskCount;
      console.log(`[${index}/${total}] ${tasks.OLD_BUILD_CLEANING} is completed.`.green);
      resolve();
    });
  });
}).then(() => {
  return new Promise((resolve, reject) => {
    webpack(webpackConfigs.server).run((err) => {
      if (err) return reject(err);

      const index = ++buildData.completedTaskCount;
      const total = buildData.taskCount;
      console.log(`[${index}/${total}] ${tasks.SERVER_BUNDLE} is completed.`.green);
      resolve();
    });
  });
}).then(() => {
  return new Promise((resolve, reject) => {
    webpack(webpackConfigs.client).run((err) => {
      if (err) return reject(err);

      const index = ++buildData.completedTaskCount;
      const total = buildData.taskCount;
      console.log(`[${index}/${total}] ${tasks.CLIENT_BUNDLE} is completed.`.green);

      resolve();
    });
  })
}).then(() => {
  return new Promise((resolve, reject) => {
    fs.copy(config.paths.staticDirectorySrc, config.paths.staticDirectoryDest, (err) => {
      if (err) return reject(err);

      const index = ++buildData.completedTaskCount;
      const total = buildData.taskCount;
      console.log(`[${index}/${total}] ${tasks.STATIC_FILE_COPYING} is completed.`.green);
      resolve();
    });
  });
});


taskPromise.then(() => {
  buildData.completedAt = new Date();

  const buildTime = (buildData.completedAt.valueOf() - buildData.startedAt.valueOf()) / 1000;
  console.log(`\nThe build completed successfully in ${buildTime.toFixed(2)}s + execution time of babel-node.`.green);
}).catch((e) => {
  console.error(String(e).red);
});
