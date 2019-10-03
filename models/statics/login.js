"use strict";

const bcrypt = require("bcryptjs");

const logIn = (email, password) => {
  const Model = this;

  let globalUser;

  return Model.findOne({ email })
    .then(user => {
      if (!user) {
        throw new Error("NO USER FOUND");
      } else {
        globalUser = user;
        return bcrypt.compare(password, user.password);
      }
    })
    .then(found => {
      if (!found) {
        throw new Error("INCORRECT CREDENTIALS");
      } else {
        return Promise.resolve(globalUser);
      }
    })
    .catch(error => {
      console.log(`ERROR DURING LOGIN: ${error}`);
      return Promise.reject(error);
    });
};

module.exports = logIn;
