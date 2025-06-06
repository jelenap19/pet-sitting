import axios from "axios";

const API_BASE =
   "http://88.200.63.148:7000/api";

axios.defaults.baseURL = API_BASE;

axios.interceptors.request.use((config) => {
  const stored = localStorage.getItem("auth");
  if (stored) {
    const { token } = JSON.parse(stored);
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default axios;
