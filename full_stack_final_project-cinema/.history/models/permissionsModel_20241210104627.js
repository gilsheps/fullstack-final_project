const mongoose = require("mongoose");

const systemUsersSchema = new mongoose.Schema({
  firstName: { type: String, required: true, unique: true },
  lastName: { type: String, required: true, unique: true },
  createDate: { type: Date },
  SessionTimeOut: { type: Number },
});

const SystemUsers = mongoose.model("SystemUser", systemUsersSchema);
module.exports = SystemUsers;