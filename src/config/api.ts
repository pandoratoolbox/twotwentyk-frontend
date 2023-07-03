import axios from "axios";

// Create an instance of axios
const api = axios.create({
  baseURL: "http://194.5.152.57:3333",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
