import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthRoutes from './auth';
import SuperAdminRoutes from './superAdmin';
import AdminRoutes from './admin';
import MemberRoutes from './member';

import PrivateRoute from './privateRoute';
import { useDispatch } from 'react-redux';
import { getAuth } from 'Redux/auth/thunks';
import { tokenListener } from 'Helper/firebase';

const Routes = () => {
  const dispatch = useDispatch();
  const role = sessionStorage.getItem('role');
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    tokenListener();
    if (token) {
      dispatch(getAuth(token));
    }
  }, [role, token]);

  const userRoute = () => {
    switch (role) {
      case 'ADMIN':
        return <Redirect to="/admins/home" />;
      case 'SUPER_ADMIN':
        return <Redirect to="/super-admins/home" />;
      case 'MEMBER':
        return <Redirect to="/members/home" />;
      default:
        return <Redirect to="/auth/login" />;
    }
  };

  return (
    <Switch>
      <Route exact path="/">
        {userRoute()}
      </Route>
      <Route path="/auth" component={AuthRoutes} />
      <PrivateRoute path="/super-admins" role="SUPER_ADMIN" component={SuperAdminRoutes} />
      <PrivateRoute path="/admins" role="ADMIN" component={AdminRoutes} />
      <PrivateRoute path="/members" role="MEMBER" component={MemberRoutes} />
    </Switch>
  );
};
export default Routes;
