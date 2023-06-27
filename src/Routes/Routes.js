import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from 'Components/Home';
import Login from 'Components/Login';
import SuperAdminRoutes from './superAdmin';
import AdminRoutes from './admin';
import MemberRoutes from './member';
import { useDispatch } from 'react-redux';
import { tokenListener } from 'Helper/firebase';
import { getAuth } from 'Redux/auth/thunks';
import PrivateRoute from './privateRoute';

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
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/auth/login" component={Login} />
      <PrivateRoute path="/super-admins" role="SUPER_ADMIN" component={SuperAdminRoutes} />
      <PrivateRoute path="/admins" role="ADMIN" component={AdminRoutes} />
      <PrivateRoute path="/members" role="MEMBER" component={MemberRoutes} />
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
    </Switch>
  );
};
export default Routes;
