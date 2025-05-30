import React, { useState } from "react";

export default function UserRegister() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { firstName, lastName, username, email, password, confirmPassword } =
      values;

    if (
      !firstName ||
      !lastName ||
      !username ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setError("All fields are mandatory");
      return;
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords must match");
      return;
    }

    setError("");
    console.log("Registration successful", values);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {error && (
        <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
      )}

      <input
        name="firstName"
        value={values.firstName}
        onChange={handleChange}
        placeholder="First Name"
      />

      <input
        name="lastName"
        value={values.lastName}
        onChange={handleChange}
        placeholder="Last Name"
      />

      <input
        name="username"
        value={values.username}
        onChange={handleChange}
        placeholder="Username"
      />

      <input
        name="email"
        type="email"
        value={values.email}
        onChange={handleChange}
        placeholder="Email"
      />

      <input
        name="password"
        type="password"
        value={values.password}
        onChange={handleChange}
        placeholder="Password"
      />

      <input
        name="confirmPassword"
        type="password"
        value={values.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm Password"
      />

      <button type="submit">Register</button>
    </form>
  );
}
