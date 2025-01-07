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
  console.log("getAllMovies");
  const filters = req.body;
  const movies = await moviesService.getAllMovies(filters);
  // console.log("movies", movies);
  res.json(movies);
});

router.get("/:page/:limit", async (req, res) => {
  const movies = await moviesService.getMovieByPage(
    req.params.page,
    req.params.limit
  );
  console.log("movies", movies);
  res.send(movies);
});

router.post("/", async (req, res) => {
  console.log(req.body);
  await moviesService.createNewMovie(req.body);
  res.send("sdfnsdfs");
});

router.put("/:id", async (req, res) => {
  console.log(req.body);
  await moviesService.updateMovie(req.params.id, req.body);
  res.send("sdfnsdfs");
});

module.exports = router;
