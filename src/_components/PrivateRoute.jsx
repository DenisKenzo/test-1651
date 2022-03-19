import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import cookies from '../_helpers/cookies';

export function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (
        cookies.utils.getAuth()
          ? <Component {...props} />
          : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )}
    />
  );
}
