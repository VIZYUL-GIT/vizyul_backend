import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const ProtectedRoute = ({ component: Component, isAuthorized, ...rest }) => (
  <Route
    {...rest}
    render={props => ((isAuthorized) 
      ? <Component {...props} /> 
      : <Redirect to="/login" />)}
  />
);

export default ProtectedRoute;