const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, unique: true },
  lastName: { type: String, required: true, unique: true },
  createDate:{type:Date},
  SessionTimeOut: {type:Numberp
    
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;