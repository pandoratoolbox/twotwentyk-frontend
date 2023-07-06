import axios from "axios";

const token = localStorage.getItem("auth") || ""
// Create an instance of axios
const api = axios.create({
  baseURL: "https://twotwentyk-api.pandoratoolbox.com",
  // baseURL: "http://localhost:3333",
  headers: {
    "Content-Type": "application/json",
  },
});

if (token !== "") {
  console.log(`token: ${token}`)
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default api;
