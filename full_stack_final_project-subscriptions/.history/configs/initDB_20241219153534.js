const axios = require("axios");
const Members = require("../models/membersModel");
const initDBOnLoad = async () => {
  const { data: members } = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
//   console.log("data", members);
  members.map(async (member)=> {
    console.log(member.name,member.email, member.address.city);
   const meme = await Members.create({
      name: member.name,
      email: member.email,
      city: member.address.city,
    });
    console.log(meme);  
    // mem.save();
  });
};

module.exports = initDBOnLoad;