const Member = require("../models/membersModel");
const Subscription = require("../models/subscriptionsModel");

const getAllMembers = async (filters) => {
  console.log("getAllMembers", filters);
  const members = await Member.find(filters);
  const subscriptions = await Subscription.aggregate([
    {
      $lookup: {
        from: "members", // Name of the Members collection
        localField: "memberId", // Field in Subscriptions
        foreignField: "_id", // Field in Members
        as: "memberDetails", // Output field for member details
      },
    },
    {
      $unwind: "$memberDetails", // Flatten member details
    },
    {
      $unwind: "$movies", // Flatten the movies array for easier lookup
    },
    {
      $lookup: {
        from: "movies", // Name of the Movies collection
        localField: "movies.movieId", // Field in Subscriptions.movies
        foreignField: "_id", // Field in Movies
        as: "movieDetails", // Output field for movie details
      },
    },
    {
      $unwind: "$movieDetails", // Flatten movie details
    },
    {
      $group: {
        _id: "$memberId", // Group by memberId
        memberDetails: {$first: "$memberDetails"}, // Include member details once
        movies: {
          $push: {
            name: "$movieDetails.name", // Movie name
            date: "$movies.date", // Subscription date
          },
        },
      },
    },
  ]);
  const result = members.map((member) => {
    const subscription = subscriptions.find((sub) => String(sub._id) === String(member._id));
    return {
      ...member.toObject(),
      movies: subscription ? subscription.movies : [],
    };
  });
  return result;
};
const getMemberByIdAndRetrunName = async (id) => {
  return await Member.findById(id).then((member) => {
    if (member) {
      return member.name;
    } else {
      return "";
    }
  });
};

const getName = async (id) => {
  console.log("getName", id);
  const member = await Member.findById(id); // Await the database query
  console.log("getName member", member);
  return member ? member.name : "";
};

const saveAllMembers = async (members) => {
  return await Member.insertMany(members);
};

const createNewMember = async (member) => {
  return new Member(member).save();
};

const updateMember = (id, obj) => {
  return Member.findByIdAndUpdate(id, obj);
};

const deleteMember = (id) => {
  return Member.findByIdAndDelete(id);
};

module.exports = {
  getAllMembers,
  saveAllMembers,
  createNewMember,
  updateMember,
  deleteMember,
  getMemberByIdAndRetrunName,
};
