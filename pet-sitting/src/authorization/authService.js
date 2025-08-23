import axios from 'axios';

const API_BASE = 'http://88.200.63.148:5198/api';

export const registerUser = async (userData) => {
  console.log('Registering user with data:', userData);
  const response = await axios.post(`${API_BASE}/auth/register`, userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_BASE}/auth/login`, credentials);
  return response.data;
};
