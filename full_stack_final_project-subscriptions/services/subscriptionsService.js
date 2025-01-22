const Subscription = require("../models/subscriptionsModel");
const Member = require("../models/membersModel");
const { ObjectId } = require("mongodb");

const createSubscription = async (subscription) => {
  console.log("subscription", subscription);
  const updateSubscription = await Subscription.updateOne(
    {
      memberId: subscription.memberId,
    },
    { $addToSet: { movies: { $each: subscription.movies } } },
    { upsert: true }
  );
  return updateSubscription;
};

const getAllSubscription = async (filters) => {
  console.log("getAllSubscription", filters);
  return await Subscription.find(filters);
};

const getSubscriptions = async () => {
  return await Subscription.find()
    .populate("memberId")
    .populate("movies.movieId");
};

const getMemberIdsByMovieId = async (movieId) => {
  try {
    const result = await Subscription.aggregate([
      { $unwind: "$movies" },
      { $match: { "movies.movieId": ObjectId.createFromHexString(movieId) } },
      {
        $project: {
          _id: 0,
          memberId: "$memberId",
          date: "$movies.date",
        },
      },
    ]);

    const fullResult = await Promise.all(
      result.map(async (doc) => {
        const name = await memeberService.getMemberByIdAndRetrunName(
          doc.memberId._id
        );
        return { name, date: doc.date };
      })
    );

    return fullResult;
  } catch (error) {
    console.error("Error fetching memberIds:", error);
    throw error;
  }
};

module.exports = {
  createSubscription,
  getAllSubscription,
  getSubscriptions,
  getMemberIdsByMovieId,
};
