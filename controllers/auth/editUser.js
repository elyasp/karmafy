"use strict";

const User = require("../../models/user");

module.exports = (req, res, next) => {
  const name = req.body.name;
  User.findByIdAndUpdate(
    req.user._id,
    {
      name
    },
    { new: true }
  )
    .then(user => {
      if (!user) {
        return next(new Error("USER_NOT_FOUND"));
      }
      res.json({ user });
    })
    .catch(error => {
      next(error);
    });
};
