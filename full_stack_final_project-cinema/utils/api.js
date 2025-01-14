const axios = require("axios");

const axiosConfig = {
  baseURL: "http://localhost:3006/api/", // Replace with your API base URL
  timeout: 20000, // Set a timeout (optional)
  headers: {
    "Content-Type": "application/json", // Default content type
  },
};
const api = axios.create(axiosConfig);
// withCredentials: true,
// api.interceptors.request.use((config) => {
//   console.log(config, import.meta.env.VITE_BASE_SERVER_CINEMA_URL);
// });
//   (config) => {
//     const token = JSON.parse(localStorage.getItem("user")).token; // Retrieve the token dynamically
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     // console.error("Request error:", error);
//     return Promise.reject(error);
//   }
// );

// api.interceptors.response.use(
//   (response) => {
//     return response; // Pass through successful responses
//   },
//   (error) => {
//     // console.error("Response error:", error);
//     // window.location.href = "/login"; // Navigate to login page
//     return Promise.reject(error); // Pass other errors for further handling
//   }
// );

module.exports = api;
