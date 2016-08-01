import path from 'path';

const config = {
  development: {
    db: path.join(__dirname, '../db/db.development.sqlite3')
  }
};

export default config[process.env.NODE_ENV];
