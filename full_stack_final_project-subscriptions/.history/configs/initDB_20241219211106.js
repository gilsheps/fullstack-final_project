const axios = require("axios");
const Members = require("../models/membersModel");
const Movies = require("../models/movieModel");
const initDBOnLoad = async () => {
  const { data: members } = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  members.map(async (member) => {
    console.log(member.name, member.email, member.address.city);
    try {
      const meme = await Members.create({
        name: member.name,
        email: member.email,
        city: member.address.city,
      });
      console.log(meme);
    } catch (error) {
      console.error("erororo", error);
    }
  });

  const { data: shows } = await axios.get("https://api.tvmaze.com/shows");
  shows.map((show) => {
    try {
      const movie = Movies.create({
        genres: show.genres,
        image: show.image.original,
        premiered: show.premiered,
      });
      console.log(movie);
    } catch (error) {
      console.error("erororo", error);
    }
  });
};

module.exports = initDBOnLoad;
