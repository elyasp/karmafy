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
    images: [
      {
        imageUrl: String
      }
    ],
    location: {
      type: String,
      required: true,
      trim: true
    },
    itemType: {
      required: true,
      enum: ["Lost", "Found"]
    },
    resolved: {
      type: Boolean,
      default: false
    },
    postedBy: {
      type: String
    }
  },

  {
    timestamps: true
  }
);

module.exports = mongoose.model("Item", schema);
