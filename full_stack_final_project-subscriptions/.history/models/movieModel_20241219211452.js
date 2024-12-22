const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  genres: { type: Array },
  image: { type: String },
  premiered: { type: Date },
});

const Movies = mongoose.model("Movie", movieSchema);
module.exports = Movies;
