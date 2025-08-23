import React from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "./Navbar";
import { Container } from "react-bootstrap";

export const Layout = () => {
  return (
    <>
      <NavBar />
      <Container className="mt-4">
        <Outlet />
      </Container>
    </>
  );
};
