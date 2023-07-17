import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthRoutes from './auth';
import SuperAdminRoutes from './superAdmin';
import AdminRoutes from './admin';
import TrainerRoutes from './trainer';
import MemberRoutes from './member';
import Landing from 'Components/LandingPage';
import PrivateRoute from './privateRoute';
import { useDispatch } from 'react-redux';
import { getAuth } from 'Redux/auth/thunks';
import { tokenListener } from 'Helper/firebase';

const Routes = () => {
  const dispatch = useDispatch();
  const token = sessionStorage.getItem('token');
  const role = sessionStorage.getItem('role');

  useEffect(() => {
    tokenListener();
    if (token) {
      dispatch(getAuth(token));
    }
  }, [token]);

  const userRoute = () => {
    switch (role) {
      case 'ADMIN':
        return <Redirect to="/admins/home" />;
      case 'SUPER_ADMIN':
        return <Redirect to="/super-admins/admins" />;
      case 'TRAINER':
        return <Redirect to="/trainers/home" />;
      case 'MEMBER':
        return <Redirect to="/members/home" />;
      default:
        return <Redirect to="/landing" />;
    }
  };

  return (
    <Switch>
      <Route exact path="/">
        {userRoute()}
      </Route>
      <Route path="/auth" component={AuthRoutes} />
      <Route exact path="/landing" component={Landing} />
      <PrivateRoute path="/super-admins" role="SUPER_ADMIN" component={SuperAdminRoutes} />
      <PrivateRoute path="/admins" role="ADMIN" component={AdminRoutes} />
      <PrivateRoute path="/members" role="MEMBER" component={MemberRoutes} />
      <PrivateRoute path="/trainers" role="TRAINER" component={TrainerRoutes} />
    </Switch>
  );
};
export default Routes;
