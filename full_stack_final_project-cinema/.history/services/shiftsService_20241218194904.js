const shiftRepo = require("../repositories/shiftsRepo.js");

const getAllShifts = async (filters) => {
  console.log("getAllShifts", filters);
  return shiftRepo.getAllShifts(filters);
};

const getById = (id) => {
  return shiftRepo.getById(id);
};

const addShift = (obj) => {
  return shiftRepo.addShift(obj);
};

const updateShift = (id, obj) => {
  return shiftRepo.updateShift(id, obj);
};

module.exports = {
  getAllShifts,
  addShift,
  getById,
  updateShift,
};
