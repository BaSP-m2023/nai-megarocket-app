import { lazy, Suspense, useEffect } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { tokenListener } from '../Helper/firebase';
import { getAuth } from '../Redux/auth/thunks';

import PrivateRoute from './privateRoute';

const AdminRoutes = lazy(() => import('./admin'));
const SuperAdminRoutes = lazy(() => import('./superAdmin'));
const AuthRoutes = lazy(() => import('./auth'));
const MemberRoutes = lazy(() => import('./member'));

const Routes = () => {
  const dispatch = useDispatch();
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    tokenListener();
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(getAuth(token));
    }
  }, [token]);

  return (
    <BrowserRouter>
      <Suspense fallback={<div />}>
        <Switch>
          <PrivateRoute path="/admins" role="ADMIN" component={AdminRoutes} />
          <PrivateRoute path="/members" role="MEMBER" component={MemberRoutes} />
          <PrivateRoute path="/super-admins" role="SUPER_ADMIN" component={SuperAdminRoutes} />
          <Route path="/auth" component={AuthRoutes} />
          <Redirect to="/auth" />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routes;
