// import { addUser, clearUsers } from "./db.js";

const userRepo = require("./repositories/userRepository.js");

function generateRandomString(length) {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function seedUsers() {
  userRepo.clearUsers();

  // admin
  const adminUsername = generateRandomString(6);
  const adminEmail = "admin@gmail.com";
  const adminPassword = generateRandomString(6);
  userRepo.createUser(adminUsername, adminEmail, adminPassword, "admin");

  // user 1
  const victim1Username = generateRandomString(6);
  const victim1Email = "victim@gmail.com";
  const victim1Password = generateRandomString(6);
  userRepo.createUser(victim1Username, victim1Email, victim1Password, "user");

  // user 2
  const victim2Username = generateRandomString(6);
  const victim2Email = "victim2@gmail.com";
  const victim2Password = generateRandomString(6);
  userRepo.createUser(victim2Username, victim2Email, victim2Password, "user");
}

module.exports = {
  seedUsers,
};
