import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { loginUser, registerUser } from './authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    const storedData = localStorage.getItem('auth');
    if (storedData) {
      const parsed = JSON.parse(storedData);
      setAuthUser(parsed);
      axios.defaults.headers.common['Authorization'] = `Bearer ${parsed.token}`;
    }
    setLoading(false);
  }, []);

  const logout = () => {
    setAuthUser(null);
    localStorage.removeItem('auth');
    delete axios.defaults.headers.common['Authorization'];
  };

  const login = async (username, password) => {
    const { user, token } = await loginUser({ username, password });
    const data = { user, token };
    setAuthUser(data);
    localStorage.setItem('auth', JSON.stringify(data));
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return user;
  };

  const register = async (userData) => {
    const { user, token } = await registerUser(userData);
    const data = { user, token };
    setAuthUser(data);
    localStorage.setItem('auth', JSON.stringify(data));
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return user;
  };

  return (
    <AuthContext.Provider value={{ authUser, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
