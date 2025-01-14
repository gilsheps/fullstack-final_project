const Movie = require("../models/movieModel");

const getAllMovies = async (filters) => {
  console.log("getAllMovies", filters);
  return Movie.find(filters);
};
const saveAllMovies = async (movies) => {
  return await Movie.insertMany(movies);
};

const getMovieByPage = async (page, limit) => {
  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    lean: true,
    leanWithId: false,
    projection: "-__v",
    customLabels: { docs: "data" },
  };
  return await Movie.paginate({}, options);
};

const createNewMovie = (obj) => {
  return new Movie(obj).save();
};

const updateMovie = (id, obj) => {
  return Movie.findByIdAndUpdate(id, obj);
};

const deleteMovie = (id) => {
  return Movie.findByIdAndDelete(id);
};
module.exports = {
  createNewMovie,
  updateMovie,
  getAllMovies,
  saveAllMovies,
  getMovieByPage,
  deleteMovie,
};
