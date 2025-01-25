const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      required: true,
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
    status: {
      type: String,
      default: "active",
    },
  },
  { timestamps: true }
);

const userModel = model("User", userSchema);

module.exports = userModel;
