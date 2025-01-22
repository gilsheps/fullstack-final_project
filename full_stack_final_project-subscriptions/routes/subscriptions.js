const express = require("express");
const subscriptionsService = require("../services/subscriptionsService");
const router = express.Router();

// Get All Subscriptions
router.get("/", async (req, res) => {
  const subscriptions = await subscriptionsService.getAllSubscription();
  console.log("get all", subscriptions);
  res.json(subscriptions);
});

router.get("/:id", async (req, res) => {
  const list = await subscriptionsService.getMemberIdsByMovieId(req.params.id);
  res.status(200).json(list);
});

// Add Subscription
router.post("/", async (req, res) => {
  const subscriptions = await subscriptionsService.createSubscription(req.body);
  // const subscriptions = await subscriptionsService.getAllSubscription();
  res.json(subscriptions);
});

module.exports = router;