// const Users = require("../users/users-model");
// const bcrypt = require("bcryptjs");

module.exports = (req, res, next) => {
  if (req.session.loggedin && req.session.loggedin === true) {
    next();
  } else {
    res.status(400).json({
      message: "Stop! You shall not pass!"
    });
  }

  // const authError = {
  //   message: "Invalid credentials"
  // };
  // return async (req, res, next) => {
  //   try {
  //     const { username, password } = req.headers;
  //     if (!username || !password) {
  //       return res.status(401).json(authError);
  //     }
  //     const user = await Users.findBy({ username }).first();
  //     if (!user) {
  //       return res.status(401).json(authError);
  //     }

  //     const passwordValid = await bcrypt.compare(password, user.password);
  //     if (!passwordValid) {
  //       return res.status(401).json(authError);
  //     }

  //     //if we reach this point the user is authenticated
  //     next();
  //   } catch (err) {
  //     next(err);
  //   }
  // };
};

// module.exports = authRequired;
