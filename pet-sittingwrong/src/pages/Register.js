import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../authorization/AuthContext';

export const Register = () => {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  const [values, setValues] = useState({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    description: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setValues(v => ({ ...v, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      first_name,
      last_name,
      email,
      username,
      password,
      confirmPassword,
      description
    } = values;

    if (!first_name || !last_name || !email || !username || !password || !confirmPassword) {
      setError('All fields are mandatory');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords must match');
      return;
    }
    try {
      await register({ first_name, last_name, email, username, password, description });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: '500px' }}>
      <h2 className="mb-4">Register</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} noValidate>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">First Name</label>
            <input
              name="first_name"
              type="text"
              className="form-control"
              value={values.first_name}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Last Name</label>
            <input
              name="last_name"
              type="text"
              className="form-control"
              value={values.last_name}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-3 mt-3">
          <label className="form-label">Email</label>
          <input
            name="email"
            type="email"
            className="form-control"
            value={values.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            name="username"
            type="text"
            className="form-control"
            value={values.username}
            onChange={handleChange}
          />
        </div>

        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              value={values.password}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              className="form-control"
              value={values.confirmPassword}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-3 mt-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            className="form-control"
            rows="3"
            value={values.description}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-success w-100">
          Register
        </button>
      </form>
    </div>
  );
};
