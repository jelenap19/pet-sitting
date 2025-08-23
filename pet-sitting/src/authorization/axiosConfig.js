import axios from "axios";

const API_BASE =
  process.env.REACT_APP_API_BASE_URL ||
  "http://88.200.63.148:7000";

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
