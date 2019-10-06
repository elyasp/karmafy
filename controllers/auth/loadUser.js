"use strict";

const User = require("../../models/user");

module.exports = (req, res, next) => {
  User.findOne({ name: req.params.name })
    .then(user => {
      res.json({ type: "SUCCESFUL", user });
    })
    .catch(error => {
      next(error);
    });
};
