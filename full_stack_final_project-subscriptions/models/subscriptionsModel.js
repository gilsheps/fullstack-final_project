const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  name: String,
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: "Members" },
  movies: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Movies" },
    { type: Date },
  ],
});

const Department = mongoose.model("Department", departmentSchema);
module.exports = Department;
