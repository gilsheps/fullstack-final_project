const express = require("express");
const cors = require("cors");
const connectDB = require("./server/configs/db.js");
const shiftsController = require("./server/controllers/shiftsController.js");
const authController = require("./server/controllers/authController.js");
const employeesController = require("./server/controllers/employeesController.js");
const departmentController = require("./server/controllers/departmentController.js");
const data = require("./server/insertData.js");
const usersController = require("./server/controllers/usersController.js");
const authenticateToken = require("./server/middleware/authenticateToken.js");
const actionsAllowedController = require("./server/controllers/actionsAllowedController.js");
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
app.use("/auth", authController);
app.use("/shifts", authenticateToken, shiftsController);
app.use("/employees", authenticateToken, employeesController);
app.use("/department", authenticateToken, departmentController);
app.use("/data", data);
app.use("/users", authenticateToken, usersController);
app.use("/allowActions", authenticateToken, actionsAllowedController);

app.listen(PORT, () => {
  console.log(`app is listening at http://localhost:${PORT}`);
});
