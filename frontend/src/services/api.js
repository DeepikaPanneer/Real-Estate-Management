import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // Change to your backend URL if different
});

// Add token to headers automatically if exists
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default api;
