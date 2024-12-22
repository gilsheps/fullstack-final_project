const mongoose = require("mongoose");
const env = require("dotenv");

const connectDB = () => {
  // Connect to MongoDB database
  mongoose
  .connect(process.env.MONGODB_URL)
    .then(() => console.log("Connected to UsersDB"))
    .catch((error) => console.log(error));
};

module.exports = connectDB;
