import axios from "axios";

// Create an instance of axios
const api = axios.create({
  // baseURL: "https://twotwentyk-api.pandoratoolbox.com",
  baseURL: "http://localhost:3333",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
