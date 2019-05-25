import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';

import StartPage from './pages/StartPage';
import UploadPage from './pages/UploadPage';

import Navigation from './components/Navigation';

import { Container } from './components/rb-import';

const AppRouter = () => (
  <Container>
    <Navigation />
    <Switch key="sw">
      <Route path="/upload" component={UploadPage} />
      <Route path="/" exact component={StartPage} />
    </Switch>
  </Container>
);

export default withRouter(AppRouter);
