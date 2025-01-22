const express = require("express");
const userServices = require("../services/userService");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jFile = require("jsonfile");
const path = require("path");

const usersFilePath = path.join(__dirname, "../data/", "users.json");
const permissionsFilePath = path.join(__dirname, "../data/", "permissions.json");
const users = require(usersFilePath);
const permissions = require(permissionsFilePath);

// Merge users and permissions
const mergeUsersAndPermissions = (users, permissions) => {
  return users.map((user) => {
    const userPermissions = permissions.find((permission) => permission.id === user.id);
    return {
      ...user,
      permissions: userPermissions ? userPermissions.permissions : [],
    };
  });
};

// Get All Users
router.get("/", (req, res) => {
  const mergedData = mergeUsersAndPermissions(users, permissions);
  mergedData.shift();
  res.send(mergedData);
});

router.post("/", async (req, res) => {
  const { firstName, lastName, username, sessionTimeout, permissions: reqPermissions } = req.body;
  const userFromDB = await userServices.addUser(username, "pass");
  let userId = userFromDB._id.toString();
  const user = {
    id: userId,
    firstName: firstName,
    lastName: lastName,
    username: username,
    sessionTimeout: sessionTimeout,
  };
  users.push(user);
  jFile.writeFileSync(usersFilePath, users, { spaces: 2 });
  let permissionObj = {
    id: userId,
    permissions: reqPermissions,
  };
  permissions.push(permissionObj);
  jFile.writeFileSync(permissionsFilePath, permissions, { spaces: 2 });
  res.send("User crated");
});

//Update User
router.put("/:id", async (req, res) => {
  const userId = req.params.id;
  const { firstName, lastName, username, sessionTimeout, permissions: reqPermissions } = req.body;
  const userUpdate = {
    id: userId,
    firstName: firstName,
    lastName: lastName,
    username: username,
    sessionTimeout: sessionTimeout,
  };
  const updateUsers = users.map((user) => (user.id === userId ? { ...user, ...userUpdate } : user));
  jFile.writeFileSync(usersFilePath, updateUsers, { spaces: 2 });
  let permissionObj = {
    id: userId,
    permissions: reqPermissions,
  };
  const updatedPermissions = permissions.map((permission) =>
    permission.id === userId ? { ...permission, ...permissionObj } : permission
  );
  console.log("updatedPermissions", updatedPermissions);
  jFile.writeFileSync(permissionsFilePath, updatedPermissions, { spaces: 2 });
  res.json("User updated");
});

// Delete User
router.delete("/:id", async (req, res) => {
  const userId = req.params.id;
  await userServices.deleteUser(userId);
  const updatedUsers = users.filter((user) => user.id !== userId);
  const updatedPermissions = permissions.filter((permission) => permission.id !== userId);
  jFile.writeFileSync(usersFilePath, updatedUsers, { spaces: 2 });
  jFile.writeFileSync(permissionsFilePath, updatedPermissions, { spaces: 2 });
  res.send("User deleted");
});

module.exports = router;
