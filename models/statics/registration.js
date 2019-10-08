"use strict";

const bcrypt = require("bcryptjs");

module.exports = function({ name, email, password, profile, location }) {
  const Model = this;

  //   console.log("THE USER IS", name, email, password, profile, location);
  return Model.findOne({ email })
    .then(user => {
      if (user) {
        throw new Error("EXISTING USER");
      } else {
        return bcrypt.hash(password, 10);
      }
    })
    .then(hash => {
      return Model.create({
        name,
        email,
        password: hash,
        profile,
        location
      });
    })
    .then(user => {
      return Promise.resolve(user);
    })
    .catch(error => {
      console.log(`Error signing up: ${error}`);
      return Promise.reject(error);
    });
};
