require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userServices = require("../services/userService");
const { createSecretToken } = require("../tokenGeneration/generateToken.js");
const router = express.Router();
const SECRET_KEY = "some_key";
const TOKEN_EXPIRATION = "5m";

// Login user
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("username", username, "password", password);
  if (!(username && password)) {
    return res.status(400).json({ message: "All input is required" });
  }
  const user = await userServices.getUserByUsername(username);
  console.log("user", user);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  bcrypt.compare(password, user.password, (err, isMatch) => {
    if (err) {
      console.error(err);
      return res.status(404).json({ message: "Invalid credentials" });
    }
    if (isMatch) {
      console.log("Password matches!");
    } else {
      console.log("Password does not match!");
    }
  });
  const token = createSecretToken(user._id);
  // res.cookie("token", token, {
  //   domain: process.env.frontend_url, // Set your domain here
  //   path: "/", // Cookie is accessible from all paths
  //   expires: TOKEN_EXPIRATION, //new Date(Date.now() + 86400000), // Cookie expires in 1 day
  //   secure: true, // Cookie will only be sent over HTTPS
  //   httpOnly: true, // Cookie cannot be accessed via client-side scripts
  //   sameSite: "None",
  // });
  console.log("token", token);
  res.json({
    success: true,
    message: "Login successful",
    user: { id: user._id, username: user.username },
    token,
  });
});

// Register user
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
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

module.exports = router;
