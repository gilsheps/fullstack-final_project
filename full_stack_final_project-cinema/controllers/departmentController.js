const express = require("express");
const mongoose = require("mongoose");
const departmentService = require("../services/departmentService.js");
const employeesService = require("../services/employeesService.js");
const { ObjectId } = require('mongodb');

const router = express.Router();

// get all department
router.get("/", async (req, res) => {
  const filters = req.body;
  const department = await departmentService.getAllDepartment(filters);
  res.send(department);
});

// create new department
router.post("/", async (req, res) => {
  const obj = req.body;
  const result = await departmentService.addDepartment(obj);
  res.json(result);
});

// update department
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    delete obj._id;
    const result = await departmentService.updateDepartment(id, obj);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

router.get("/:departmentId/employees", async (req, res) => {
  const { departmentId } = req.params;
  const employee = await employeesService.getAllEmployees({
    departmentId: new ObjectId(departmentId),
  });
  res.json(employee);
});

module.exports = router;
