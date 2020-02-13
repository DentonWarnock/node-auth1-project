const router = require("express").Router();
const bcrypt = require("bcryptjs");
const authRequired = require("../middleware/auth-required");

const Users = require("./users-model.js");

// /api/users
router.get("/", authRequired(), (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;
