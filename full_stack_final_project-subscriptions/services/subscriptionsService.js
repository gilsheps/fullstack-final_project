const Subscription = require("../models/subscriptionsModel");

const createSubscription = async (memberId, movies) => {
  const subscription = new Subscription({ memberId, movies });
  return await subscription.save();
};
const getSubscriptions = async () => {
  return await Subscription.find()
    .populate("memberId")
    .populate("movies.movieId");
};
module.exports = { createSubscription, getSubscriptions };
