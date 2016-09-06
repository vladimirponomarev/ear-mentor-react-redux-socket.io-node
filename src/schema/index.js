const query = `CREATE TABLE IF NOT EXISTS players (
                 id INTEGER PRIMARY KEY,
                 name VARCHAR(64) NOT NULL,
                 country VARCHAR(2) NOT NULL,
                 score INTEGER NOT NULL DEFAULT 0,
                 createdAt DATETIME NOT NULL DEFAULT (DATETIME('now')),
                 updatedAt DATETIME NOT NULL DEFAULT (DATETIME('now'))
              )`;

export default query;

