import webpack from 'webpack';
import colors from 'colors'
import webpackConfig from '../webpack/config.production.js';

const bundleStats = {
  startedAt: new Date(),
  completedAt: new Date()
};

console.log('Bundling with Webpack...'.green);
const taskPromise = Promise.resolve().then(() => {
  return new Promise((resolve, reject) => {
    webpack(webpackConfig).run((err) => {
      if (err) return reject(err);

      resolve();
    });
  });
});

taskPromise.then(() => {
  bundleStats.completedAt = new Date();

  const buildTime = (bundleStats.completedAt.valueOf() - bundleStats.startedAt.valueOf()) / 1000;
  console.log(`\nThe bundle was completed successfully in ${buildTime.toFixed(2)}s + execution time of babel-node.`.green);
}).catch((e) => {
  console.error(String(e).red);
});
