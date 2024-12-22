const express = require("express");
const cors = require("cors");
const connectDB = require("./configs/db.js");
const app = express();
const PORT = 3005;

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
// app.use("/auth", authController);
// app.use("/shifts", authenticateToken, shiftsController);
// app.use("/employees", authenticateToken, employeesController);
// app.use("/department", authenticateToken, departmentController);
// app.use("/data", data);
// app.use("/users", authenticateToken, usersController);
// app.use("/allowActions", authenticateToken, actionsAllowedController);

app.listen(PORT, () => {
  console.log(`app is listening at http://localhost:${PORT}`);
});

// https://api.tvmaze.com/shows
// https://jsonplaceholder.typicode.com/users