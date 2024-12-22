const mongoose = require("mongoose");

const membersSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  city: { type: String, required: true },
});

const Members = mongoose.model("Members", membersSchema);
module.exports = Members;