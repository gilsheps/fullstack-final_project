const mongoose = require("mongoose");
const env = require("dotenv");

env.config();
const connectDB = async () => {
	mongoose
		.connect(process.env.MONGODB_URL, { useUnifiedTopology: true, serverSelectionTimeoutMS: 30000, socketTimeoutMS: 45000 })
		.then(() => console.log("Connected to UsersDB"))
		.catch((error) => console.log(error));
};

// mongoose.set('bufferCommands', false);
module.exports = connectDB;
