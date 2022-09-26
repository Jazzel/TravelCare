const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BusinessSchema = new Schema(
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

module.exports = Business = mongoose.model("business", BusinessSchema);
