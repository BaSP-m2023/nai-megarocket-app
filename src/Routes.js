import { Switch, Route, Redirect } from 'react-router-dom';
import Activities from './Components/Activities';
import Admins from './Components/Admins/index';
import Classes from './Components/Classes';
import Members from './Components/Members';
import Subscriptions from './Components/Subscriptions';
import SuperAdmins from './Components/SuperAdmins';
import Trainers from './Components/Trainers';

import ActivitiesForm from './Components/Activities/Form';
import AdminsForm from './Components/Admins/Form';
import ClassesForm from './Components/Classes/Form';
import MembersForm from './Components/Members/Form';
//import SubscriptionsForm from './Components/Subscriptions/Form';
import SuperAdminsForm from './Components/SuperAdmins/Form';
import TrainersForm from './Components/Trainers/Form';
import Home from './Components/Home';

const Routes = () => {
  return (
    <>
      <Switch>
        <Route path="/home" component={Home} />
        <Route exact path="/activities" component={Activities} />
        <Route exact path="/activities/form" component={ActivitiesForm} />
        <Route path="/activities/form/:id" component={ActivitiesForm} />
        <Route exact path="/admins" component={Admins} />
        <Route exact path="/admins/form" component={AdminsForm} />
        <Route path="/admins/form/:id" component={AdminsForm} />
        <Route exact path="/classes" component={Classes} />
        <Route exact path="/classes/form" component={ClassesForm} />
        <Route path="/classes/form/:id" component={ClassesForm} />
        <Route exact path="/members" component={Members} />
        <Route exact path="/members/form" component={MembersForm} />
        <Route path="/members/form/:id" component={MembersForm} />
        <Route exact path="/subscriptions" component={Subscriptions} />
        {/*<Route path="/subscriptions/form" component={SubscriptionsForm} />*/}
        <Route exact path="/super-admins" component={SuperAdmins} />
        <Route exact path="/super-admins/form" component={SuperAdminsForm} />
        <Route path="/super-admins/form/:id" component={SuperAdminsForm} />
        <Route exact path="/trainers" component={Trainers} />
        <Route exact path="/trainers/form" component={TrainersForm} />
        <Route path="/trainers/form/:id?" component={TrainersForm} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </>
  );
};

export default Routes;
