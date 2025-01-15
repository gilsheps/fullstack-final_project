const express = require("express");
const axios = require("axios");
const router = express.Router();
const api = require("../utils/api");

// Get All Subscriptions
router.get("/", async (req, res) => {
  try {
    const response = await api.get("subscriptions");
    res.json(response.data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { data } = await api.get(`subscriptions/${req.params.id}`);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Add Subscription
router.post("/", async (req, res) => {
  const subscriptions = req.body;
  try {
    const { data } = await api.post("subscriptions", subscriptions);
    console.log("movieName", data);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
