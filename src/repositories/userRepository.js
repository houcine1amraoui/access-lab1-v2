const db = require("../db/database");

// CREATE
function createUser(username, email, password, role) {
  const stmt = db.prepare(`
    INSERT INTO users (username, email, password, role)
    VALUES (?, ?, ?, ?)
  `);
  return stmt.run(username, email, password, role);
}

// READ ALL
function getAllUsers() {
  return db.prepare(`SELECT * FROM users`).all();
}

// READ ONE
function getUserById(id) {
  return db.prepare(`SELECT * FROM users WHERE id = ?`).get(id);
}

// UPDATE
function updateUser(id, name, email) {
  return db
    .prepare(
      `
    UPDATE users
    SET name = ?, email = ?
    WHERE id = ?
  `,
    )
    .run(name, email, id);
}

// DELETE
function deleteUserByUsername(username) {
  return db
    .prepare(
      `
    DELETE FROM users WHERE username = ?
  `,
    )
    .run(username);
}

// DELETE ALL users (for testing purposes)
function clearUsers() {
  return db.prepare(`DELETE FROM users`).run();
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUserByUsername,
  clearUsers,
};
