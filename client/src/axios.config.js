// import axios from "axios";

// export const axiosInstance = axios.create({
//   baseURL: process.env.REACT_APP_BACKEND_BASE,
//   headers: {
//     "Content-Type": "application/json",
//   },

//   withCredentials: true,
// });

import axios from "axios";
import toast from "react-hot-toast";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_BASE,
});

axiosInstance.interceptors.request.use(async (request) => {
  const token = localStorage.getItem("token");
  // Add the Authorization header to the request if the session exists
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Check if the response status is 401 or like token expired or token is not valid
    if (error.response && error.response.status === 401) {
      toast.error("Session expired. Please login again.");
      return Promise.resolve(localStorage.removeItem("token"));
    }
    // Pass the error along
    return Promise.reject(error);
  }
);
