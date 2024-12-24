const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: "Members" },
  movies: [{ movieId: mongoose.Schema.Types.ObjectId, date: Date }]
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);
module.exports = Subscription;
