const express = require("express");
const userServices = require("../services/userService");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jFile = require("jsonfile");
const path = require("path");

const usersFilePath = path.join(__dirname, "../data/", "users.json");
const permissionsFilePath = path.join(
  __dirname,
  "../data/",
  "permissions.json"
);
const users = require(usersFilePath);
const permissions = require(permissionsFilePath);

// Merge users and permissions
const mergeUsersAndPermissions = (users, permissions) => {
  return users.map((user) => {
    const userPermissions = permissions.find(
      (permission) => permission.id === user.id
    );
    return {
      ...user,
      permissions: userPermissions ? userPermissions.permissions : [],
    };
  });
};

// Get All Users
router.get("/", (req, res) => {
  const mergedData = mergeUsersAndPermissions(users, permissions);
  console.log("mergedData", mergedData);
  mergedData.shift();
  res.send(mergedData);
});

//Update User
router.put("/:id", async (req, res) => {
  // const { firstName, lastName, username, password, sessionTimeout, permissions } = req.body;
  const updatedUser = userServices.updateUser(req.params.id, req.body);
  res.json(updatedUser);
});

// Delete User
router.delete("/:id", async (req, res) => {
  const userId = req.params.id;
  await userServices.deleteUser(userId);
  const updatedUsers = users.filter((user) => user.id !== userId);
  const updatedPermissions = permissions.filter(
    (permission) => permission.id !== userId
  );
  jFile.writeFileSync(usersFilePath, updatedUsers, { spaces: 2 });
  jFile.writeFileSync(permissionsFilePath, updatedPermissions, { spaces: 2 });
  res.send("User deleted");
});

module.exports = router;
