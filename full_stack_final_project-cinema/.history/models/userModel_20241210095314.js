const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true, unique: true },
  actionsAllowed: { type: Number, default: 10 },
});

const User = mongoose.model("User", userSchema);
module.exports = User;