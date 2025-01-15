const express = require("express");
const router = express.Router();
const api = require("../utils/api");

// Get All Movies
router.get("/", async (req, res) => {
  try {
    const { data } = await api.get("movies");
    res.json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/:page/:limit", async (req, res) => {
  try {
    const { data } = await api.get(
      `movies/${req.params.page}/${req.params.limit}`
    );
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  console.log("get movie name ciema");
  try {
    const { data } = await api.get(`movies/${req.params.id}`);
    console.log("movieName", data);
    res.json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/", async (req, res) => {
  const { updateMovie } = req.body;
  try {
    const { data } = await api.post("movies", updateMovie);
    res.send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put("/:id", async (req, res) => {
  const { updateMovie } = req.body;
  console.log("update", updateMovie, req.params.id);
  try {
    const { data } = await api.put(`movies/${req.params.id}`, updateMovie);
    res.send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  console.log("delete", req.params.id);
  try {
    const { data } = await api.delete(`movies/${req.params.id}`);
    res.send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
module.exports = router;
