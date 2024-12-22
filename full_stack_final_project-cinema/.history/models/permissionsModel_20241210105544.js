const mongoose = require("mongoose");

const systemUsersSchema = new mongoose.Schema({
  permissions: { type: Array, required: true },
}, {
  toJSON: { virtuals: true }
});

const SystemUsers = mongoose.model("SystemUser", systemUsersSchema);
module.exports = SystemUsers;
