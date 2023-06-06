import { Switch, Route, Redirect } from 'react-router-dom';
import Activities from './Components/Activities';
import Admins from './Components/Admins/index';
import Classes from './Components/Classes';
import Members from './Components/Members';
import Subscriptions from './Components/Subscriptions';
import SuperAdmins from './Components/SuperAdmins';
import Trainers from './Components/Trainers';
import SubscriptionsForm from './Components/Subscriptions/Form';

//import ActivitiesForm from './Components/Activities/Form';
//import AdminsForm from './Components/Admins/Form';
//import ClassesForm from './Components/Classes/Form';
//import MembersForm from './Components/Members/Form';
//import SuperAdminsForm from './Components/SuperAdmins/Form';
//import TrainersForm from './Components/Trainers/Form';
import Home from './Components/Home';

const Routes = () => {
  return (
    <>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/activities" component={Activities} />
        {/*<Route path="/activities/form" component={ActivitiesForm} />*/}
        <Route exact path="/admins" component={Admins} />
        {/*<Route path="/admins/form" component={AdminsForm} />*/}
        <Route exact path="/classes" component={Classes} />
        {/*<Route path="/classes/form" component={ClassesForm} />*/}
        <Route exact path="/members" component={Members} />
        {/*<Route path="/members/form" component={MembersForm} />*/}
        <Route exact path="/subscriptions" component={Subscriptions} />
        <Route path="/subscriptions/form" component={SubscriptionsForm} />
        <Route exact path="/super-admins" component={SuperAdmins} />
        {/*<Route path="/superadmins/form" component={SuperAdminsForm} />*/}
        <Route exact path="/trainers" component={Trainers} />
        {/*<Route path="/trainers/form" component={TrainersForm} />*/}
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </>
  );
};

export default Routes;
