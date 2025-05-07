require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const userServices = require("../services/userService");
const router = express.Router();
const permissions = require("../data/permissions.json");
const users = require("../data/users.json");

// Login user
router.post("/login", async (req, res) => {
  const {username, password} = req.body;
  console.log("username", username, "password", password);
  if (!(username && password)) {
    return res.status(400).json({message: "All input is required"});
  }
  const user = await userServices.getUserByUsername(username);
  if (!user) {
    return res.status(404).json({message: "User not found"});
  }
  console.log("password", password, "user.password", user.password);
  bcrypt.compare(password, user.password, (err, isMatch) => {
    if (err) {
      console.error(err);
      return res.status(404).json({message: "Invalid credentials"});
    }
    if (isMatch) {
      console.log("Password matches!");
      const timeout = users.find((item) => item.id === user._id.toString()).sessionTimeOut;
      return res.json({
        success: true,
        message: "Login successful",
        user: {id: user._id, username: user.username, sessionTimeOut: timeout},
        permissions: permissions.find((permission) => permission.id === user._id.toString()).permissions,
      });
    } else {
      return res.status(401).send("Password does not match!");
    }
  });
});

// Register user
router.post("/register", async (req, res) => {
  const {username, password} = req.body;
  const user = await userServices.getUserByUsername(username);
  console.log("user", user);
  if (user) {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashedPassword", hashedPassword);
    await userServices.firstLogin(username, hashedPassword);
    res.status(201).send(`User ${username} updated successfully`);
  } else {
    return res.status(400).json({message: `User ${username} not exists`});
  }
});

module.exports = router;
