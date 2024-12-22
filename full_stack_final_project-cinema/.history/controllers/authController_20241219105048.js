const express = require("express");
const jwt = require("jsonwebtoken");
const userService = require("../services/userService.js");
const authenticateToken = require("../middleware/authenticateToken.js");
const { createSecretToken } = require("../tokenGeneration/generateToken.js");

const router = express.Router();
const SECRET_KEY = "some_key";
const TOKEN_EXPIRATION = "1m";

// function generateToken(username) {
//   return jwt.sign({ username }, SECRET_KEY, { expiresIn: TOKEN_EXPIRATION });
// }

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("login", username, password);

  if (!(email && password)) {
    return res.status(400).json({ message: "All input is required" });
  }
  // const user = await User.findOne({ email });
  // if (!(user && (await bcrypt.compare(password, user.password)))) {
  //   return res.status(404).json({ message: "Invalid credentials" });
  // }
  // const isUserExists = await userService.isUserExists(username, password);
  // console.log("isUserExists", isUserExists);
  // if (isUserExists.length == 0) {
  //   return res.status(403).json({ error: "Invalid credentials" });
  // }
  const token = createSecretToken(user._id);
  res.cookie("token", token, {
    domain: process.env.frontend_url, // Set your domain here
    path: "/", // Cookie is accessible from all paths
    expires: TOKEN_EXPIRATION, //new Date(Date.now() + 86400000), // Cookie expires in 1 day
    secure: true, // Cookie will only be sent over HTTPS
    httpOnly: true, // Cookie cannot be accessed via client-side scripts
    sameSite: "None",
  });

  res.json({ token });
});

router.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "Access granted", user: req.user });
});

module.exports = router;
