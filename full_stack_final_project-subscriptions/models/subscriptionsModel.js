const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: "Member" },
  movies: [{ movieId: mongoose.Schema.Types.ObjectId, date: Date }],
});

const Subscriptions = mongoose.model("Subscription", subscriptionSchema);
module.exports = Subscriptions;
