import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../authorization/AuthContext";

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [values, setValues] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = values;
    if (!username || !password) {
      setError("Both values are required");
      return;
    }
    try {
      await login(username, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4">Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit} noValidate>
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

        <div className="mb-3">
          <label className="form-label">password</label>
          <input
            name="password"
            type="password"
            className="form-control"
            value={values.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
      <div className="mt-3">
        <p>
          Don't have an account?{" "}
          <a href="/register" className="text-decoration-none">
            Register
          </a>
        </p>
    </div>
    </div>
  );
};
