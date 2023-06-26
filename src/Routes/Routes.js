import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from 'Components/Home';
import Login from 'Components/Login';
import SuperAdminRoutes from './superAdmin';
import AdminRoutes from './admin';
import MemberRoutes from './member';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route path="/super-admin" component={SuperAdminRoutes} />
      <Route path="/admin" component={AdminRoutes} />
      <Route path="/member" component={MemberRoutes} />
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
    </Switch>
  );
};
export default Routes;
