const mongoose = require("mongoose");
const env = require("dotenv");

env.config();
const connectDB = async () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Connected to SubscriptionsDB"))
    .catch((error) => console.log(error));
};

module.exports = connectDB;
