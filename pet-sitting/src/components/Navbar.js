// 


import React, { useContext } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../authorization/AuthContext";

export const NavBar = () => {
  const { authUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar
      expand="lg"
      style={{ backgroundColor: "#ff69b4" }}
      variant="light"
    >
      <Container>
        <Navbar.Brand
          as={NavLink}
          to="/"
          style={{ color: "white", fontWeight: "bold", fontSize: "1.25rem" }}
        >
          Pet Sitting
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" className="border-0" />
        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={NavLink}
              to="/"
              style={({ isActive }) => ({
                color: isActive ? "white" : "rgba(255, 255, 255, 0.8)",
                marginRight: "1rem",
                fontSize: "1rem",
              })}
            >
              Home
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/add-post"
              style={({ isActive }) => ({
                color: isActive ? "white" : "rgba(255, 255, 255, 0.8)",
                marginRight: "1rem",
                fontSize: "1rem",
              })}
            >
              Add Post
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/profile"
              style={({ isActive }) => ({
                color: isActive ? "white" : "rgba(255, 255, 255, 0.8)",
                marginRight: "1rem",
                fontSize: "1rem",
              })}
            >
              My Profile
            </Nav.Link>
          </Nav>

          <Nav>
            {authUser ? (
              <Button
                variant="outline-light"
                onClick={handleLogout}
                style={{ fontSize: "0.95rem" }}
              >
                Logout
              </Button>
            ) : (
              <Nav.Link
                as={NavLink}
                to="/login"
                style={({ isActive }) => ({
                  color: isActive ? "white" : "rgba(255, 255, 255, 0.8)",
                  fontSize: "1rem",
                })}
              >
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
