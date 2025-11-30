// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: { type: String },
  githubId: { type: String },

  name: { type: String, required: true },
  email: { type: String },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
