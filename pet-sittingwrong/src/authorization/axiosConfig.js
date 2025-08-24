import axios from "axios";

const API_BASE =
   "http://88.200.63.148:7000";

axios.defaults.baseURL = API_BASE;

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:7000";


axios.interceptors.request.use((config) => {
  const stored = localStorage.getItem("auth");
  if (stored) {
    const { token } = JSON.parse(stored);
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default axios;
