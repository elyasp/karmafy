"use strict";

const User = require("../../models/user");

module.exports = (req, res, next) => {
  User.findOneAndDelete({ name: req.params.name })
    .then(user => {
      if (user) {
        req.session.destroy();
        res.json({ type: "SUCCESULLY_DELETED_USER" });
      } else {
        next(new Error("USER_NOT_DELETED"));
      }
    })
    .catch(error => {
      next(error);
    });
};
