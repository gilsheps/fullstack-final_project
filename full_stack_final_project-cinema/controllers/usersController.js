const express = require("express");
const userService = require("../services/userService");

const router = express.Router();

// get all employees
router.get("/", async (req, res) => {
  const filters = req.body;
  console.log("params", filters);
  const users = await userService.getAllUsers(filters);
  res.send(users);
});

// get user by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await userService.getById(id);
  res.json(user);
});

router.get("/fullName/:name", async (req, res) => {
  const { name } = req.params;
  const user = await userService.getId({ fullName: name });
  res.json(user);
});

// create new user
router.post("/", async (req, res) => {
  const obj = req.body;
  console.log("post", obj);
  const result = await userService.addUser(obj);
  res.json(result);
});

module.exports = router;
