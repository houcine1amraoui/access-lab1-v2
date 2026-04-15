const Database = require("better-sqlite3");
const path = require("path");

// Store DB outside pkg (IMPORTANT)
const dbPath = path.join(process.cwd(), "users.db");

const db = new Database(dbPath);

// Initialize tables
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL
  )
`,
).run();

module.exports = db;
