require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./configs/db.js");
const bodyParser = require("body-parser");
const initDBOnLoad = require("./configs/initDB.js");
const membersRoutes = require("./routes/members.js");
const moviesRoutes = require("./routes/movie.js");
const subscriptionsRoutes = require("./routes/subscriptions.js");
const app = express();
const PORT = process.env.PORT;
connectDB();

app.use(
  cors({
    origin: ["http://localhost:3006", "http://localhost:5173"], // Replace with your frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // If you need to allow cookies
  })
);
app.use(bodyParser.json());
app.use("/api/members", membersRoutes);
app.use("/api/movies", moviesRoutes);
app.use("/api/subscriptions", subscriptionsRoutes);

app.listen(PORT, () => {
  console.log(`app is listening at http://localhost:${PORT}`);
  initDBOnLoad();
});
