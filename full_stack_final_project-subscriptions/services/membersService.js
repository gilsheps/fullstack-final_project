const Member = require("../models/membersModel");

const getAllMembers = async (filters) => {
  console.log("getAllMembers", filters);
  return await Member.find(filters);
};

const saveAllMembers = async (members) => {
  return await Member.insertMany(members);
};

const createNewMember = async (member) => {
  return new Member(member).save();
};

const updateMember = (id, obj) => {
  return Member.findByIdAndUpdate(id, obj);
};

const deleteMember = (id) => {
  return Member.findByIdAndDelete(id);
};

module.exports = {
  getAllMembers,
  saveAllMembers,
  createNewMember,
  updateMember,
  deleteMember,
};
