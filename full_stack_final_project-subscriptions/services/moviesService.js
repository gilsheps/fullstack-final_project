const Movie = require('../models/movie');

const getAllMovies = async () => {
    return await Movie.find();
}
const saveAllMovies = async (movies) => {
    return await Movie.insertMany(movies);
}

module.exports = { getAllMovies, saveAllMovies };