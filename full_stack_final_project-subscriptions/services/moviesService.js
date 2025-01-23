const Movie = require("../models/movieModel");
const Subscription = require("../models/subscriptionsModel");
const Member = require("../models/membersModel");

const getAllMovies = async (filters) => {
  console.log("getAllMovies", filters);
  return Movie.find(filters);
};

const getMovieName = async (id) => {
  return await Movie.findById(id)
    .then((movie) => {
      if (movie) {
        console.log("Name of the movie:", movie.name);
        return movie.name;
      } else {
        console.log("movie not found");
        return "";
      }
    })
    .catch((error) => {
      console.error("Error fetching show:", error);
    });
};
const saveAllMovies = async (movies) => {
  return await Movie.insertMany(movies);
};

const getMovieByPage = async (page, limit) => {
  console.log("start getMovieByPage");
  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    lean: true,
    leanWithId: false,
    projection: "-__v",
    customLabels: {docs: "data"},
  };
  const result = await Movie.paginate({}, options);
  const movieIds = result.data.map((movie) => movie._id);

  const subscriptions = await Subscription.aggregate([
    {
      $match: {
        "movies.movieId": {$in: movieIds},
      },
    },
    {
      $unwind: "$movies",
    },
    {
      $project: {
        memberId: 1,
        date: "$movies.date",
        movieId: "$movies.movieId",
      },
    },
  ]);
  const finalResults = await Promise.all(
    result.data.map(async (movie) => {
      const members = await Promise.all(
        subscriptions
          .filter((sub) => sub.movieId.equals(movie._id))
          .map(async (sub) => ({
            name: await getName(sub.memberId),
            date: sub.date,
          }))
      );
      return {movie, members};
    })
  );
  result["data"] = finalResults;
  console.log("Results:", result);

  return result;
};

const getName = async (id) => {
  console.log("getName", id);
  const member = await Member.findById(id);
  console.log("getName member", member);
  return member ? member.name : "";
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
  getMovieName,
};
