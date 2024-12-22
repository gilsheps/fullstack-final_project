const axios = require("axios");
const Members = require("../models/membersModel");
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
    console.log('showwww',show.name, show.genres, show.image.original, show.premiered);
  });
};

module.exports = initDBOnLoad;
