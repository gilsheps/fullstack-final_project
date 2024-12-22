const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const env = require("dotenv");
const router = express.Router();

env.config();
// Register user
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login user
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("login", username, password);
  console.log("JWT_SECRET", process.env.JWT_SECRET);
  try {
    const user = await User.findOne({ username });
    console.log("user", user);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5m",
    });
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Protected route
router.get("/profile", async (req, res) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    console.log("user", user,"decoded",decoded);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

module.exports = router;
