const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  genres: { type: Array, required: true, unique: true },
  image: { type: String },
  premiered: { type: Date },
});

const Movies = mongoose.model("Movie", movieSchema);
module.exports = Movies;
