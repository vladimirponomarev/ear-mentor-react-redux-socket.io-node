import path from 'path';

const distDirectory = path.join(__dirname, '../dist');

const config = {
  development: {
    db: path.join(__dirname, '../db/db.development.sqlite3'),
    port: 3000,
    paths: {
      distDirectory,
      staticDirectorySrc: path.join(__dirname, '../src/static'),
      staticDirectoryDest: path.join(__dirname, '../dist/static')
    }
  },
  test: {
    db: path.join(__dirname, '../db/db.test.sqlite3'),
    port: 3001,
    paths: {
      distDirectory,
      staticDirectorySrc: path.join(__dirname, '../src/static'),
      staticDirectoryDest: path.join(__dirname, '../dist/static')
    }
  },
  production: {
    db: path.join(__dirname, '../db/db.sqlite3'),
    port: 8081,
    paths: {
      distDirectory,
      staticDirectorySrc: path.join(__dirname, '../src/static'),
      staticDirectoryDest: path.join(__dirname, '../dist/static')
    }
  }
};

export default config[process.env.NODE_ENV];
