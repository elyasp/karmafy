"use strict";

const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    imageUrl: [
      {
        image: String
      }
    ],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    location: {
      type: Object
    },
    itemStatus: {
      type: String
    },
    resolved: {
      type: Boolean,
      default: false
    },
    ownerCheck: {
      type: String
    }
  },

  {
    timestamps: true
  }
);

module.exports = mongoose.model("Item", schema);
