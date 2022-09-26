const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const Business = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    addedBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = Business = mongoose.model("business", Business);
