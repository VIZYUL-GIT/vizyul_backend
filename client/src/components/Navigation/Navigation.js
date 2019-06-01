import React from 'react';

import { Navbar, Nav } from '../rb-import';
import RouterNavLink from '../RouterNavLink';

const Navigation = ({ username, logoutUser }) => (
  <Navbar bg="light" expand="lg">
    <Navbar.Brand href="#home">VIZYUL</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <RouterNavLink to="/">Home</RouterNavLink>
        <RouterNavLink to="/upload">Upload</RouterNavLink>
        <Nav.Link href="#xpath">Xpath</Nav.Link>
      </Nav>
      {username
        ? (
          <>
            <Navbar.Text>
              Logged in as: {username}
            </Navbar.Text>
            <Nav.Link onClick={() => logoutUser()}>Logout</Nav.Link>
            </>
        ) : (
          <Nav>
            <RouterNavLink to="/register">Register</RouterNavLink>
            <RouterNavLink to="/login">Login</RouterNavLink>
          </Nav>
        )}
    </Navbar.Collapse>
  </Navbar>
);

export default Navigation;