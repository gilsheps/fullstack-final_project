const express = require("express");
const employeesService = require("../services/employeesService.js");

const router = express.Router();

// get all employees
router.get("/", async (req, res) => {
  const filters = req.body;
  const employees = await employeesService.getAllEmployees(filters);
  res.send(employees);
});
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const employee = await employeesService.getById(id);
  res.json(employee);
});

router.get("/:departmentId", async (req, res) => {
  const { departmentId } = req.params;
  const employee = await employeesService.getAllEmployees({
    departmentId: ObjectId(departmentId),
  });
  res.json(employee);
});

// create new employees
router.post("/", async (req, res) => {
  const obj = req.body;
  const result = await employeesService.addEmployee(obj);
  res.json(result);
});

// update employee
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    delete obj._id;
    const result = await employeesService.updateEmployee(id, obj);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
