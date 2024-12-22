const employeesRepo = require("../repositories/employeesRepo.js");

const getAllEmployees = (filters) => {
  return employeesRepo.getAllEmployees(filters);
};

const getById = (id) => {
  return employeesRepo.getById(id);
};

const addEmployee = (obj) => {
  return employeesRepo.addEmployee(obj);
};

const updateEmployee = (id, obj) => {
  return employeesRepo.updateEmployee(id, obj);
};

const deleteEmployee = (id) => {
  return employeesRepo.deleteEmployee(id);
};

module.exports = {
  getAllEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getById,
};
