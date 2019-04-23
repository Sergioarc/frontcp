import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({
  children, isValidation, pathURL, ...rest
}) => (
  <Route
    {...rest}
    render={(routeProps) => {
      if (!isValidation) {
        return (
          <Redirect
            to={{
              pathname: pathURL,
              state: { from: routeProps.location },
            }}
          />
        );
      }
      return children;
    }}
  />
);
export default PrivateRoute;