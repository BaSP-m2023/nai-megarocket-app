import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthRoutes from './auth';
import SuperAdminRoutes from './superAdmin';
import AdminRoutes from './admin';
import TrainerRoutes from './trainer';
import MemberRoutes from './member';
import { useDispatch } from 'react-redux';
import { tokenListener } from 'Helper/firebase';
import { getAuth } from 'Redux/auth/thunks';
import PrivateRoute from './privateRoute';

const Routes = () => {
  const dispatch = useDispatch();
  const role = sessionStorage.getItem('role');
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    tokenListener();
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(getAuth(token));
    }
  }, []);

  const isLogged = () => {
    switch (role) {
      case 'ADMIN':
        return <Redirect to="/admins/home" />;
      case 'SUPER_ADMIN':
        return <Redirect to="/super-admins/home" />;
      case 'TRAINER':
        return <Redirect to="/trainers/home" />;
      case 'MEMBER':
        return <Redirect to="/members/home" />;
      default:
        return <Redirect to="/auth/login" />;
    }
  };

  return (
    <Switch>
      <Route path="/auth" component={AuthRoutes} />
      <PrivateRoute path="/super-admins" role="SUPER_ADMIN" component={SuperAdminRoutes} />
      <PrivateRoute path="/admins" role="ADMIN" component={AdminRoutes} />
      <PrivateRoute path="/trainers" role="TRAINER" component={TrainerRoutes} />
      <PrivateRoute path="/members" role="MEMBER" component={MemberRoutes} />
      <Route exact path="/">
        {isLogged()}
      </Route>
    </Switch>
  );
};
export default Routes;
