import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';

import StartPage from './pages/StartPage';
import UploadPage from './pages/UploadPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';

import { Container, Row, Col } from './components/rb-import';

function NoMatch({ location }) {
  return (
    <Row>
      <Col>
        <h3>
          No match for <code>{location.pathname}</code>
        </h3>
      </Col>
    </Row>
  );
}

const AppRouter = () => (
  <Container>
    <Navigation />
    <Switch key="sw">
      <ProtectedRoute path="/upload" component={UploadPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/" exact component={StartPage} />
      <Route component={NoMatch} />
    </Switch>
  </Container>
);

export default withRouter(AppRouter);
