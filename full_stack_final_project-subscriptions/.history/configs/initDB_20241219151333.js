const axios = require("axios");

const initDBOnLoad = () => {
  const { data } = axios.get("https://jsonplaceholder.typicode.com/users");
  console.log("data", data);
};

module.exports = initDBOnLoad;
