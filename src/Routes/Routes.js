import { Switch, Route, Redirect } from 'react-router-dom';

import Home from 'Components/Home';

import SuperAdminSuperAdmins from 'Components/SuperAdmin/SuperAdmins';
import SuperAdminAdmins from 'Components/SuperAdmin/Admins/index';
import SuperAdminAdminsForm from 'Components/SuperAdmin/Admins/Form';
import SuperAdminSuperAdminsForm from 'Components/SuperAdmin/SuperAdmins/Form';

import MemberActivities from 'Components/Member/Activities';
import MemberMembership from 'Components/Member/Memberships';
import MemberProfile from 'Components/Member/Profile';
import MemberSchedule from 'Components/Member/Schedule';

import MemberProfileForm from 'Components/Member/Profile/Form';

import AdminActivities from 'Components/Admin/Activities';
import AdminProfile from 'Components/Admin/Profile/index';
import AdminClasses from 'Components/Admin/Classes';
import AdminMembers from 'Components/Admin/Members';
import AdminReports from 'Components/Admin/Reports';
import AdminSubscriptions from 'Components/Admin/Subscriptions';
import AdminTrainers from 'Components/Admin/Trainers';

import AdminActivitiesForm from 'Components/Admin/Activities/Form';
import AdminClassesForm from 'Components/Admin/Classes/Form';
import AdminMembersForm from 'Components/Admin/Members/Form';
import AdminSubscriptionsForm from 'Components/Admin/Subscriptions/Form';
import AdminTrainersForm from 'Components/Admin/Trainers/Form/';

const Routes = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/super-admin">
          <Route exact path="/super-admin/admins" component={SuperAdminAdmins} />
          <Route exact path="/super-admin/admins/form" component={SuperAdminAdminsForm} />
          <Route path="/super-admin/admins/form/:id" component={SuperAdminAdminsForm} />
          <Route exact path="/super-admin/super-admins" component={SuperAdminSuperAdmins} />
          <Route
            exact
            path="/super-admin/super-admins/form"
            component={SuperAdminSuperAdminsForm}
          />
          <Route path="/super-admin/super-admins/form/:id" component={SuperAdminSuperAdminsForm} />
        </Route>

        <Route path="/member">
          <Route path="/member/activities" component={MemberActivities} />
          <Route path="/member/membership" component={MemberMembership} />
          <Route exact path="/member/profile" component={MemberProfile} />
          <Route path="/member/profile/form/:id" component={MemberProfileForm} />
          <Route exact path="/member/schedule" component={MemberSchedule} />
        </Route>

        <Route path="/admin">
          <Route exact path="/admin/activities" component={AdminActivities} />
          <Route exact path="/admin/activities/form" component={AdminActivitiesForm} />
          <Route path="/admin/activities/form/:id" component={AdminActivitiesForm} />
          <Route exact path="/admin/profile" component={AdminProfile} />
          <Route exact path="/admin/classes" component={AdminClasses} />
          <Route exact path="/admin/classes/form" component={AdminClassesForm} />
          <Route path="/admin/classes/form/:id" component={AdminClassesForm} />
          <Route exact path="/admin/members" component={AdminMembers} />
          <Route exact path="/admin/members/form" component={AdminMembersForm} />
          <Route path="/admin/members/form/:id" component={AdminMembersForm} />
          <Route exact path="/admin/reports" component={AdminReports} />
          <Route exact path="/admin/subscriptions" component={AdminSubscriptions} />
          <Route exact path="/admin/subscriptions/form" component={AdminSubscriptionsForm} />
          <Route path="/admin/subscriptions/form/:id" component={AdminSubscriptionsForm} />
          <Route exact path="/admin/trainers" component={AdminTrainers} />
          <Route exact path="/admin/trainers/form" component={() => AdminTrainersForm} />
          <Route path="/admin/trainers/form/:id?" component={AdminTrainersForm} />
        </Route>

        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </>
  );
};

export default Routes;
