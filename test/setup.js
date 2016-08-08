import sqlite3 from 'sqlite3';
import colors from 'colors';
import config from '../config';
import schema from '../src/schema';


const db = new sqlite3.Database(config.db);

before((done) => {
  db.parallelize(() => {
    db.run(schema, (err) => {
      if (err) return console.error(String(err).red);

      done();
    });
  });
});

