const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Users = require("../users/users-model");

// /api/auth/register
router.post("/register", (req, res) => {
  let user = req.body;
  console.log(user);

  const hash = bcrypt.hashSync(user.password, 6);
  console.log(hash);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.loggedin = true;
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.delete("/logout", (req, res) => {
  if (req.session) {
    // check out the documentation for this method at
    // https://www.npmjs.com/package/express-session, under Session.destroy().
    req.session.destroy(err => {
      if (err) {
        res.status(400).send("though shall not leave!");
      } else {
        res.send("you made it out! its your lucky day!");
      }
    });
  } else {
    res.end();
  }
});

module.exports = router;
