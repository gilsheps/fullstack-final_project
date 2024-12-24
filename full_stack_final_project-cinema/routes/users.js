const express = require("express");
const userServices = require("../services/userService");
const bcrypt = require("bcryptjs");
const router = express.Router();
// const authMiddleware = require('../middleware/authMiddleware');

// Get All Users
router.get("/", async (req, res) => {
  const filters = req.query;
  console.log("filters", filters);
  const users = await userServices.getAllUsers(filters);
  res.json(users);
});

// First Login
router.post("/", async (req, res) => {
    // const { firstName, lastName, username, password, sessionTimeout, permissions } = req.body;

  const { username, password } = req.body;
  console.log("username", username, "password", password);
  const user = await userServices.getUserByUsername(username);
  console.log("user", user);
  if (user) {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashedPassword", hashedPassword);
    await userServices.firstLogin(username, password);
    res.status(201).send(`User ${username} updated successfully`);
  } else {
    return res.status(400).json({ message: `User ${username} not exists` });
  }
});

// Update User
// router.put("/:id", async (req, res) => {
//   const updatedUser = userServices.updateUser(req.params.id, req.body);
//   res.json(updatedUser);
// });

// // Delete User
// router.delete("/:id", async (req, res) => {
//   await userServices.deleteUser(req.params.id);
//   res.send("User deleted");
// });

module.exports = router;
