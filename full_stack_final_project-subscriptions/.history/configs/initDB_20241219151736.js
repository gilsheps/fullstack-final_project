const axios = require("axios");

const initDBOnLoad = async () => {
  const { data: members } = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
//   console.log("data", members);
  members.map((member) => {
    console.log(member.name,member.email, member.address.city);
  });
};

module.exports = initDBOnLoad;
