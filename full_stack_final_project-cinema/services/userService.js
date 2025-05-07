const User = require("../models/userModel");

const getAllUsers = async (filters) => {
  console.log("filters", filters);
  const users = await User.find(filters);
  users.shift();
  return users;
};
const getUserByUsername = async (username) => {
  console.log("getUserByUsername", username);
  return await User.findOne({username});
};

const addUser = async (username, password) => {
  const user = new User({username, password});
  return await user.save();
};

const updateUser = async (id, updatedUser) => {
  return await User.findByIdAndUpdate(id, updatedUser, {new: true});
};

const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

const firstLogin = async (username, password) => {
  console.log("firstLogin", username, password);
  const filter = {username: username};
  const update = {password: password};
  return await User.findOneAndUpdate(filter, update, {
    new: true,
  });
};

module.exports = {
  getAllUsers,
  addUser,
  updateUser,
  getUserByUsername,
  deleteUser,
  firstLogin,
};
