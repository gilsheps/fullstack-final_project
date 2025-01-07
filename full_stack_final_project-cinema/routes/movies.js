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
  console.log("cinemaaa", data);
  res.send(data);
});

router.post("/", async (req, res) => {
  console.log("body", req.body, process.env.SUBSCRIPTIONS_URL);
  try {
    await axios.post(`${process.env.SUBSCRIPTIONS_URL}movies/`, req.body);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put("/", async (req, res) => {
  console.log("put", req.body, process.env.SUBSCRIPTIONS_URL);
  try {
    await axios.put(`${process.env.SUBSCRIPTIONS_URL}movies/`, req.body);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
module.exports = router;
