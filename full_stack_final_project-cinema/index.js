require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./configs/db.js");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT;

connectDB();

// const authController = require("./controllers/authController.js");
const authRoutes = require("./routes/auth.js");
const usersRoutes = require("./routes/users.js");
const permissionsRoutes = require("./routes/permissions.js");
const moviesRoutes = require("./routes/movies.js");
const memberRoutes = require("./routes/members.js");
const subscriptionsRoutes = require("./routes/subscriptions.js");

app.use(
  cors({
    origin: ["http://localhost:3005", "http://localhost:3006", "http://localhost:5173"], // Replace with your frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // If you need to allow cookies
  })
);
app.use(bodyParser.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/permissions", permissionsRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/movies", moviesRoutes);
app.use("/api/subscriptions", subscriptionsRoutes);

app.listen(PORT, () => {
  console.log(`app is listening at http://localhost:${PORT}`);
});
