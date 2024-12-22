const axios = require("axios");

const initDBOnLoad = async () => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  console.log("data", data);
};

module.exports = initDBOnLoad;
