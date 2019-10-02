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

// == ADD STATICS LATER FOR PASSPORT

module.exports = mongoose.model("User", schema);
