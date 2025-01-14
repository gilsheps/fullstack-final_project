const express = require("express");
const router = express.Router();
const api = require("../utils/api");

const BASE_URL = "members";
// Get All Members
router.get("/", async (req, res) => {
  try {
    const { data } = await api.get(BASE_URL);
    console.log("get res", data);
    res.json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/", async (req, res) => {
  const { updateMember } = req.body;
  console.log("updateMember", updateMember);
  try {
    const { data } = await api.post(BASE_URL, updateMember);
    console.log("data", data);
    res.send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put("/:id", async (req, res) => {
  const { updateMember } = req.body;
  console.log("update", updateMember, req.params.id);
  try {
    const { data } = await api.put(`${BASE_URL}/${req.params.id}`, updateMember);
    res.send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  console.log("delete", req.params.id);
  try {
    const { data } = await api.delete(`${BASE_URL}/${req.params.id}`);
    res.send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
module.exports = router;
