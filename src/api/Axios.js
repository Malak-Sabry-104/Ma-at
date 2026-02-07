import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1", // This what? it is an axios instance where it refers to our backend wait a sec
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
