const mongoose = require("mongoose");

const membersSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  city: { type: String },
});

const Members = mongoose.model("Member", membersSchema);
module.exports = Members;
