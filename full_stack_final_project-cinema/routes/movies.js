const express = require("express");
const axios = require("axios");
const router = express.Router();

// Get All Movies
router.get("/", async (req, res) => {
  try {
    const { data } = await axios.get(`${process.env.SUBSCRIPTIONS_URL}movies`);
    res.json(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/:page/:limit", async (req, res) => {
  const { data } = await axios.get(
    `${process.env.SUBSCRIPTIONS_URL}movies/${req.params.page}/${req.params.limit}`
  );
  res.send(data);
});

router.post("/", async (req, res) => {
  const { updateMovie } = req.body;
  try {
    const { data } = await axios.post(
      `${process.env.SUBSCRIPTIONS_URL}movies`,
      updateMovie
    );
    console.log('data',data)
    res.send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put("/:id", async (req, res) => {
  const { updateMovie } = req.body;
  console.log("update", updateMovie, req.params.id);
  try {
    const { data } = await axios.put(
      `${process.env.SUBSCRIPTIONS_URL}movies/${req.params.id}`,
      updateMovie
    );
    res.send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  console.log("delete", req.params.id);
  try {
    const { data } = await axios.delete(
      `${process.env.SUBSCRIPTIONS_URL}movies/${req.params.id}`
    );
    res.send(data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
module.exports = router;
