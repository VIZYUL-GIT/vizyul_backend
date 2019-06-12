import React from 'react';

import { Navbar, Nav } from '../rb-import';
import RouterNavLink from '../RouterNavLink';

const Navigation = ({ authenticated, name, logoutUser }) => (
  <Navbar bg="light" expand="lg">
    <Navbar.Brand href="/">VIZYUL</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      {authenticated
        ? (
          <>
            <Nav className="mr-auto">
              <RouterNavLink to="/upload">Upload</RouterNavLink>
              <Nav.Link href="/servers">Servers</Nav.Link>
            </Nav>
            <Navbar.Text>
              Logged in as: {name}
            </Navbar.Text>
            <Nav.Link onClick={() => logoutUser()}>Logout</Nav.Link>
            </>
        ) : (
          <Nav className="ml-auto">
            <RouterNavLink to="/register">Register</RouterNavLink>
            <RouterNavLink to="/login">Login</RouterNavLink>
          </Nav>
        )}
    </Navbar.Collapse>
  </Navbar>
);

export default Navigation;