const axios = require("axios");

const axiosConfig = {
  baseURL: "http://localhost:3006/api/", // Replace with your API base URL
  timeout: 20000, // Set a timeout (optional)
  headers: {
    "Content-Type": "application/json", // Default content type
  },
};
const api = axios.create(axiosConfig);

module.exports = api;
