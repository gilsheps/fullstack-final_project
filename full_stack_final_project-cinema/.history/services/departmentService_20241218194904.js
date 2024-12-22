const departmentRepo = require("../repositories/departmentRepo.js");

const getAllDepartment = (filters) => {
  return departmentRepo.getAllDepartment(filters);
};

const addDepartment = (obj) => {
  return departmentRepo.addDepartment(obj)
}


const updateDepartment = (id, obj) => {
  return departmentRepo.updateDepartment(id, obj);
};


module.exports = {
  getAllDepartment,
  addDepartment,
  updateDepartment
};
