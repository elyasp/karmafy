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
    type: [Number]
  },
  profilePhoto: {
    type: String
  },
  count: {
    type: Number
  }
});

schema.statics.register = "statics/registration.js";
schema.statics.login = "statics/login.js";

module.exports = mongoose.model("User", schema);
