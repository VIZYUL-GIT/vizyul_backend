import React from 'react';

import { Navbar, Nav } from '../components/rb-import';
import RouterNavLink from './RouterNavLink';

const Navigation = () => (
  <Navbar bg="light" expand="lg">
    <Navbar.Brand href="#home">VIZYUL</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <RouterNavLink to="/">Home</RouterNavLink>
        <RouterNavLink to="/upload">Upload</RouterNavLink>
        <Nav.Link href="#xpath">Xpath</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Navigation;