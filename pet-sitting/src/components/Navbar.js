import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { NavLink} from "react-router-dom";

export const NavBar = () => {
  var user = true;
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          Pet Sitting
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>

            <Nav.Link as={NavLink} to="/profile">
              My Profile
            </Nav.Link>
          </Nav>

          <Nav>
            {/* this is for when I add authorization tomorrow */}
            {user ? (
              <Button variant="outline-light">Logout</Button>
            ) : (
              <Nav.Link as={NavLink} to="/login">
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
