const express = require("express");
const shiftsService = require("../services/shiftsService.js");

const router = express.Router();

//get All shift
router.get("/", async (req, res) => {
  const filters = req.body;
  const shifts = await shiftsService.getAllShifts(filters);
  res.send(shifts);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const shifts = await shiftsService.getById(id);
  res.json(shifts);
});

router.post("/", async (req, res) => {
  try {
    const obj = req.body;
    const result = await shiftsService.addShift(obj);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    delete obj._id
    console.log(id,obj)
    const result = await shiftsService.updateShift(id, obj);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});


module.exports = router;
