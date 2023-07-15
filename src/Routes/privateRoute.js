import Container from 'Components/Shared/Container';

import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const PrivateRoute = ({ component: RouteComponent, isActive, role, ...rest }) => {
  const auth = useSelector((state) => state.auth);
  const isAuthPending = auth?.isAuthPending;
  const roleSession = sessionStorage.getItem('role');

  if (isAuthPending || auth.user === null) {
    return (
      <Container center={true}>
        <ClipLoader />
      </Container>
    );
  }
  const userStatus = auth?.user?.isActive;

  if (!isAuthPending && roleSession === role && userStatus === isActive) {
    return <RouteComponent {...rest} />;
  }
  return <Redirect to="/auth/not-allowed" />;
};

export default PrivateRoute;
