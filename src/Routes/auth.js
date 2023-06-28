import React, { Suspense, lazy } from 'react';
import { Route } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

const Login = lazy(() => import('Components/Login'));
const SignUp = lazy(() => import('Components/SignUp'));

const AuthRoutes = () => {
  return (
    <Suspense fallback={<ClipLoader />}>
      <Route exact path="/auth/login" component={Login} />
      <Route exact path="/auth/register" component={SignUp} />
    </Suspense>
  );
};

export default AuthRoutes;
