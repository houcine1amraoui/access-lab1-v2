const express = require("express");
const router = express.Router();

const userRepo = require("../repositories/userRepository");

// GET all users
router.get("/", (req, res) => {
  const users = userRepo.getAllUsers();
  res.json(users);
});

// GET one user
router.get("/:id", (req, res) => {
  const user = userRepo.getUserById(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

// CREATE
router.post("/", (req, res) => {
  const { name, email } = req.body;
  const result = userRepo.createUser(name, email);
  res.status(201).json({ id: result.lastInsertRowid });
});

// UPDATE
router.put("/:id", (req, res) => {
  const { name, email } = req.body;
  userRepo.updateUser(req.params.id, name, email);
  res.json({ success: true });
});

// DELETE
router.delete("/:id", (req, res) => {
  userRepo.deleteUser(req.params.id);
  res.json({ success: true });
});

module.exports = router;
