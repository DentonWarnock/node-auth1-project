const session = require("express-session");
const knexSessionStore = require("connect-session-knex")(session);
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const router = express.Router();
const authRouter = require("./auth/auth-router");
const usersRouter = require("./users/users-router");

const sessionOptions = {
  name: "mycookie",
  secret: "cookiesareyumyummewantcookies",
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    secure: false,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: false,

  store: new knexSessionStore({
    knex: require("./data/dbConfig"),
    tablename: "sessions",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 1000 * 60 * 60 * 24 * 7
  })
};

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use(session(sessionOptions));

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);

router.get("/", (req, res, next) => {
  res.json({ message: "Server Online" });
});

server.use((req, res) => {
  res.status(404).json({
    message: "Route was not found"
  });
});

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "An internal error occurred, please try again later"
  });
});

module.exports = server;
