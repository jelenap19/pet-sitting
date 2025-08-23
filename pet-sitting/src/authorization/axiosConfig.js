import axios from "axios";

const API_BASE =
   "http://88.200.63.148:5198/api";

axios.defaults.baseURL = API_BASE;

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5198/api";


axios.interceptors.request.use((config) => {
  const stored = localStorage.getItem("auth");
  if (stored) {
    const { token } = JSON.parse(stored);
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default axios;
