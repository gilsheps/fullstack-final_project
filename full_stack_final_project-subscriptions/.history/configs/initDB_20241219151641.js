const axios = require("axios");

const initDBOnLoad = async () => {
  const { data: members } = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
//   console.log("data", members);
  members.map((member) => {
    console.log(member);
  });
};

module.exports = initDBOnLoad;
