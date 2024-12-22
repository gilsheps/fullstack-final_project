const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true, unique: true },
  lastName: { type: String, required: true, unique: true },
  startWorkYear: { type: Number, required: true },
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Department" }
});

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
