const userService = require("../services/userService");
// const bcrypt = require("bcrypt");
const express = require("express");

const env = require("dotenv");
const { createSecretToken } = require("../tokenGeneration/generateToken.js");

env.config();

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("login", username, password);

  if (!(username && password)) {
    return res.status(400).json({ message: "All input is required" });
  }
  const user = userService.getUserByUsername(username);
  console.log("user", user);
  // if (!(user && (await bcrypt.compare(password, user.password)))) {
  //   return res.status(404).json({ message: "Invalid credentials" });
  // }
  // const isUserExists = await userService.isUserExists(username, password);
  // console.log("isUserExists", isUserExists);
  // if (isUserExists.length == 0) {
  //   return res.status(403).json({ error: "Invalid credentials" });
  // }
  // const token = createSecretToken(user._id);
  // res.cookie("token", token, {
  //   domain: process.env.frontend_url, // Set your domain here
  //   path: "/", // Cookie is accessible from all paths
  //   expires: TOKEN_EXPIRATION, //new Date(Date.now() + 86400000), // Cookie expires in 1 day
  //   secure: true, // Cookie will only be sent over HTTPS
  //   httpOnly: true, // Cookie cannot be accessed via client-side scripts
  //   sameSite: "None",
  // });

  res.json({ user });
});
module.exports = router;
