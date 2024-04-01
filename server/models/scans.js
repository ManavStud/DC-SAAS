const mongoose = require("mongoose");

const scanSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    domain: {
      type: String,
      required: true,
    },
    tool: {
      type: String,
      required: true,
    },
    result: {
      type: String,
      required: true,
    },
    input: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Scan", scanSchema);
