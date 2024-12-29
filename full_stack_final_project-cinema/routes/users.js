const express = require("express");
const userServices = require("../services/userService");
const bcrypt = require("bcryptjs");
const router = express.Router();
const fs = require("fs");
const users = require("../data/users.json");
const permissions = require("../data/permissions.json");
// const authMiddleware = require('../middleware/authMiddleware');
// Merge users and permissions
const mergeUsersAndPermissions = (users, permissions) => {
  return users.map(user => {
    console.log("user", user, "permissions", permissions);
    const userPermissions = permissions.find(permission => permission.id === user.id);
    return { ...user, permissions: userPermissions ? userPermissions.permissions : [] };
  });
};

// Get All Users
router.get("/",(req, res) => {
  const mergedData = mergeUsersAndPermissions(users, permissions);
  res.send(mergedData);
});


//Update User
router.put("/:id", async (req, res) => {
  // const { firstName, lastName, username, password, sessionTimeout, permissions } = req.body;
  const updatedUser = userServices.updateUser(req.params.id, req.body);
  res.json(updatedUser);
});

// // Delete User
// router.delete("/:id", async (req, res) => {
//   await userServices.deleteUser(req.params.id);
//   res.send("User deleted");
// });

module.exports = router;
