const axios = require("axios");
const Members = require("../models/membersModel");
const Movies = require("../models/movieModel");

const initDBOnLoad = async () => {
	const { data: members } = await axios.get(process.env.USERS_URL);

	var update = { expire: new Date() };
	var options = { upsert: true, new: true, setDefaultsOnInsert: true };
	members.map(async (member) => {
		var filter = { name: member.name, email: member.email, city: member.address.city };
		console.log(member.name, member.email, member.address.city);
		try {
			await Members.findOneAndUpdate(filter, update, options, function (error, result) {
				if (error) return;
			});
		} catch (error) {
			console.error("erororo", error);
		}
	});

	const { data: shows } = await axios.get(process.env.SHOW_URL);
	shows.map(async (show) => {
		var filter = { name: show.name, genres: show.genres, image: show.image.original, premiered: show.premiered };
		try {
			await Movies.findOneAndUpdate(filter, update, options, function (error, result) {
				if (error) return;
			});
		} catch (error) {
			console.error("erororo", error);
		}
	});
};

module.exports = initDBOnLoad;
