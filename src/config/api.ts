import axios from "axios";
import { toast } from 'react-toastify'; // Import toast from react-toastify

const token = localStorage.getItem("auth") || "";


// Create an instance of axios
const api = axios.create({
  baseURL: "https://twotwentyk-api.pandoratoolbox.com",
  // baseURL: "http://localhost:3333",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a response interceptor
api.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that fall outside the range of 2xx cause this function to trigger
  // Do something with response error
  if (error.response) {
    // The request was made, but the server responded with an error status code
    const { status, data } = error.response;
    
    // Display a toast with the error message
    toast.error(`Error ${status}: ${data}`);
  } else if (error.request) {
    // The request was made, but no response was received
    toast.error('Network error. Please check your internet connection.');
  } else {
    // Something happened in setting up the request that triggered an error
    toast.error('An error occurred while sending the request.');
  }
  
  return Promise.reject(error);
});


if (token !== "") {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default api;
