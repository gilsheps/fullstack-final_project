const express = require("express");
const subscriptionsService = require("../services/subscriptionsService");
const router = express.Router();
const { ObjectID } = require("mongodb");

// Get All Subscriptions
router.get("/", async (req, res) => {
  const subscriptions = subscriptionsService.getSubscriptions();
  res.json(subscriptions);
});

// Add Subscription
router.post("/", async (req, res) => {
  const { memberId, movies } = req.body;
  console.log(memberId,movies)
  try {
    const subscription = subscriptionsService.createSubscription(
      new ObjectID(memberId),
      movies
    );
    res.status(201).send(subscription);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
