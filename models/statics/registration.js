"use strict";

const bcrypt = require("bcryptjs");

const register = (
  name,
  email,
  password,
  latitude,
  longitude,
  profilePhoto,
  count
) => {
  const Model = this;

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
        location: [latitude, longitude],
        profilePhoto,
        count
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

module.exports = register;
