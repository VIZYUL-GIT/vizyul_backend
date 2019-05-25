import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav } from './rb-import';

const RouterNavLink = ({ children, ...props }) => (
  <LinkContainer {...props}>
    <Nav.Link active={false}>
      {children}
    </Nav.Link>
  </LinkContainer>
);

export default RouterNavLink;