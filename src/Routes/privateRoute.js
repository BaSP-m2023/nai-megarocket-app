import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const role = sessionStorage.getItem('role');
  const token = sessionStorage.getItem('token');
  const error = useSelector((state) => state.auth?.error);

  return (
    <Route
      {...rest}
      render={(routeProps) => {
        if (token && role === rest.role) {
          return <RouteComponent {...routeProps} />;
        }
        if ((!role || role !== rest.role || !token) && !error) {
          return <Redirect to={'/auth/not-allowed'} />;
        }
        return <Redirect ro={'/auth/login'} />;
      }}
    />
  );
};

export default PrivateRoute;
