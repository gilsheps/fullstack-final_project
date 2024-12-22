const mongoose = require('mongoose');
const User = require('./userModel'); // Import the model
const fs = require('fs');

// MongoDB connection URL
const mongoURL = "mongodb://127.0.0.1:27017/yourDatabaseName";

// Connect to MongoDB
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));

// Import JSON data
const importUsers = async () => {
    try {
        const data = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8'));

        // Insert users into the database
        await User.insertMany(data);
        console.log("Users imported successfully");
    } catch (err) {
        console.error("Error importing users:", err);
    } finally {
        mongoose.connection.close();
    }
};

importUsers();
