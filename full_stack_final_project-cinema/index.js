const express = require("express");
const cors = require("cors");
const connectDB = require("./configs/db.js");
const authController = require("./controllers/authController.js");
// const auth = require("./controllers/auth.js");
const login = require("./routes/auth.js");
const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(
  cors({
    origin: ["http://localhost:3005", "http://localhost:5173"], // Replace with your frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // If you need to allow cookies
  })
);

app.use("/", express.json());
app.use("/api/auth", login);
// app.use('/api/members', membersRoutes);
// app.use('/api/movies', moviesRoutes);
// app.use('/api/subscriptions', subscriptionsRoutes);

app.listen(PORT, () => {
  console.log(`app is listening at http://localhost:${PORT}`);
});
