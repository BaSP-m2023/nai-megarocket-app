import Container from 'Components/Shared/Container';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { getAuth } from 'Redux/auth/thunks';
import { tokenListener } from 'Helper/firebase';

const PrivateRoute = ({ component: RouteComponent, role, ...rest }) => {
  const dispatch = useDispatch();
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    tokenListener();
    if (token) {
      dispatch(getAuth(token));
    }
  }, []);

  const auth = useSelector((state) => state.auth);
  const isAuthPending = auth?.isAuthPending;

  const roleSession = sessionStorage.getItem('role');
  if (isAuthPending) {
    return (
      <Container realCenter={true}>
        <ClipLoader />
      </Container>
    );
  }

  if (!isAuthPending && roleSession === role) {
    return <RouteComponent {...rest} />;
  }
  return <Redirect to="/auth/not-allowed" />;
};

export default PrivateRoute;
