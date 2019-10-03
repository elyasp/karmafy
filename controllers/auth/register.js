"use strict";

const User = require("./../../models/user");

module.exports = (req, res, next) => {
  const { name, email, password } = req.body;
  User.register({
    name,
    email,
    password
  })
    .then(user => {
      req.session.user = {
        _id: user._id
      };
      res.json({ user });
    })
    .catch(error => {
      next(error);
    });
};
