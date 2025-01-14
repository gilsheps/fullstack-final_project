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
    await moviesService.saveAllMovies(movies);
    res.status(200).send("Movies populated successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/", async (req, res) => {
  console.log("getAllMovies");
  const filters = req.body;
  const movies = await moviesService.getAllMovies(filters);
  res.json(movies);
});

router.get("/:page/:limit", async (req, res) => {
  const movies = await moviesService.getMovieByPage(
    req.params.page,
    req.params.limit
  );
  res.send(movies);
});

router.post("/", async (req, res) => {
  try {
    const { data } = await moviesService.createNewMovie(req.body);
    console.log("post", data);
    res.status(200).send("Movie created");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    await moviesService.updateMovie(req.params.id, req.body);
    res.status(200).send("Movie updated");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await moviesService.deleteMovie(id);
    res.send(`Movie with id: ${id} was deleted`);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
