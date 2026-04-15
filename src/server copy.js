import express from "express";
import session from "express-session";
import { fileURLToPath } from "url";
import path from "path";
import { seedUsers } from "../utils.js";
import { deleteUserByUsername, loadUsers } from "../db.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// Middleware for session handling
app.use(
  session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to `true` if using HTTPS
  }),
);

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "pages"));

seedUsers();

app.use("/css", express.static(path.resolve(__dirname, "pages", "css")));
app.use("/js", express.static(path.resolve(__dirname, "pages", "js")));
app.use("/robots.txt", express.static(path.resolve(__dirname, "robots.txt")));

// Render dynamic HTML with the first user
app.get("/", (req, res) => {
  const users = loadUsers();
  res.render("index", { users: users });
});

app.get("/login", function (req, res) {
  res.sendFile(path.resolve(__dirname, "pages", "login.html"));
});

app.get("/account", isAuthenticated, function (req, res) {
  res.render("account", { user: req.session.user });
});

app.get("/administrator-panel", function (req, res) {
  const flag = "cab853c52730";
  const users = loadUsers();
  const nonAdminUsers = users.filter((user) => user.role !== "admin");
  res.render("admin", { users: nonAdminUsers, flag: flag });
});

app.post("/delete/:username", function (req, res) {
  const { username } = req.params;
  console.log(username);
  deleteUserByUsername(username);
  return res.send("user deleted");
});

// auth middleware
function isAuthenticated(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  next();
}

// authorization middleware
function isAdmin(req, res, next) {
  if (req.session.user.role != "admin") {
    return res.redirect("/login");
  }
  next();
}

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const users = loadUsers();
  const user = users.find((user) => {
    return user.username === username;
  });

  // check username
  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  // check password
  if (user.password !== password) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  // create session
  req.session.user = { username, role: user.role };
  // redirect to /account
  return res.json({ redirect: "/account" });
});

// Logout route
app.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "Logged out successfully" });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Lab running on http://localhost:${PORT}`);
});
