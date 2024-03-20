const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "asdadsfcfhasbxchasc";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign({ _id: this._id }, JWT_SECRET);
  } catch (err) {
    return res.json({ status: "failed", message: err });
  }
};

module.exports = mongoose.model("User", userSchema);
