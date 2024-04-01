const mongoose = require("mongoose");

const androguardScanSchema = new mongoose.Schema(
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
      type: Object,
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

module.exports = mongoose.model("AndroguardScan", androguardScanSchema);
