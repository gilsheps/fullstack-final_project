const express = require("express");
const moviesService = require("../services/moviesService");
const axios = require("axios");
const router = express.Router();

// Populate Movies
router.get("/populate", async (req, res) => {
  try {
    const response = await axios.get("https://api.tvmaze.com/shows");
    const movies = response.data.map((show) => ({
      name: show.name,
      genres: show.genres,
      image: show.image ? show.image.medium : "",
      premiered: show.premiered,
    }));
    await Movie.insertMany(movies);
    res.status(200).send("Movies populated successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/", async (req, res) => {
  const movies = moviesService.getAllMovies();
  res.json(movies);
});

module.exports = router;
