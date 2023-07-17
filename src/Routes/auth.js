import Container from 'Components/Shared/Container';
import React, { Suspense, lazy } from 'react';
import { Route } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

const Login = lazy(() => import('Components/Auth/Login'));
const SignUp = lazy(() => import('Components/Auth/SignUp'));
const NotAllowed = lazy(() => import('Components/Auth/NotAllowed'));

const AuthRoutes = () => {
  return (
    <Suspense
      fallback={
        <Container isLogin={true}>
          <ClipLoader />
        </Container>
      }
    >
      <Route exact path="/auth/login" component={Login} />
      <Route exact path="/auth/register" component={SignUp} />
      <Route exact path="/auth/not-allowed" component={NotAllowed} />
    </Suspense>
  );
};

export default AuthRoutes;
