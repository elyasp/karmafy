"use strict";

const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  location: {
    type: String
  },
  profile: {
    type: String
  },
  karmaCount: {
    type: Number
  }
});

const registerStatic = require("./statics/registration.js");
const logInStatic = require("./statics/login.js");

schema.statics.register = registerStatic;
schema.statics.logIn = logInStatic;

module.exports = mongoose.model("User", schema);
