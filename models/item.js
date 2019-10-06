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
    // images: [
    //   {
    //     imageUrl: String
    //   }
    // ],
    imageUrl: {
      type: String
    },
    location: {
      type: String,
      // required: true,
      trim: true
    },
    itemStatus: {
      type: String
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
