import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

import { Navbar, Nav } from '../rb-import';
import RouterNavLink from '../RouterNavLink';

const Navigation = ({ authenticated, name, logoutUser }) => (
  <Navbar bg="light" expand="lg">
    <LinkContainer to="/">
      <Navbar.Brand>VIZYUL</Navbar.Brand>
    </LinkContainer>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      {authenticated
        ? (
          <>
            <Nav className="mr-auto">
              <RouterNavLink to="/upload">Upload</RouterNavLink>
              <RouterNavLink to="/servers">Servers</RouterNavLink>
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