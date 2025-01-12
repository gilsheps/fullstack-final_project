const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const movieSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  genres: { type: Array },
  image: { type: String },
  premiered: { type: Date },
});

movieSchema.plugin(mongoosePaginate);

const Movies = mongoose.model("Movie", movieSchema);
module.exports = Movies;

