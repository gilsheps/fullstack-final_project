const Movie = require('../models/movieModel');

const getAllMovies = async (filters) => {
    console.log('getAllMovies', filters)
    return Movie.find(filters);
}
const saveAllMovies = async (movies) => {
    return await Movie.insertMany(movies);
}

module.exports = { getAllMovies, saveAllMovies };