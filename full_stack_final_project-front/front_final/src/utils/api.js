import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3005/api/", // Replace with your API base URL
  timeout: 20000, // Set a timeout (optional)
  headers: {
    "Content-Type": "application/json", // Default content type
  },
  withCredentials: true,
});

// api.interceptors.request.use(
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

api.interceptors.response.use(
  (response) => {
    return response; // Pass through successful responses
  },
  (error) => {
    // console.error("Response error:", error);
    // window.location.href = "/login"; // Navigate to login page
    return Promise.reject(error); // Pass other errors for further handling
  }
);

export default api;
