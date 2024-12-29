const Movie = require('../models/movieModel');

const getAllMovies = async () => {
    return await Movie.find();
}
const saveAllMovies = async (movies) => {
    return await Movie.insertMany(movies);
}

module.exports = { getAllMovies, saveAllMovies };