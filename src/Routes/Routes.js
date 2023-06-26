import { Switch, Route, Redirect } from 'react-router-dom';
import React, { Suspense, lazy, useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import Home from 'Components/Home';
import Login from 'Components/Login';
import SignUp from 'Components/SignUp';
import { useDispatch } from 'react-redux';
import { tokenListener } from 'Helper/firebase';
import { getAuth } from 'Redux/auth/thunks';

const SuperAdminAdmins = lazy(() => import('Components/SuperAdmin/Admins/index'));
const SuperAdminAdminsForm = lazy(() => import('Components/SuperAdmin/Admins/Form'));
const MemberActivities = lazy(() => import('Components/Member/Activities'));
const MemberMembership = lazy(() => import('Components/Member/Memberships'));
const MemberProfile = lazy(() => import('Components/Member/Profile'));
const MemberSchedule = lazy(() => import('Components/Member/Schedule'));
const MemberProfileForm = lazy(() => import('Components/Member/Profile/Form'));
const AdminActivities = lazy(() => import('Components/Admin/Activities'));
const AdminProfile = lazy(() => import('Components/Admin/Profile/index'));
const AdminClasses = lazy(() => import('Components/Admin/Classes'));
const AdminMembers = lazy(() => import('Components/Admin/Members'));
const AdminReports = lazy(() => import('Components/Admin/Reports'));
const AdminSubscriptions = lazy(() => import('Components/Admin/Subscriptions'));
const AdminTrainers = lazy(() => import('Components/Admin/Trainers'));
const AdminActivitiesForm = lazy(() => import('Components/Admin/Activities/Form'));
const AdminClassesForm = lazy(() => import('Components/Admin/Classes/Form'));
const AdminMembersForm = lazy(() => import('Components/Admin/Members/Form'));
const AdminSubscriptionsForm = lazy(() => import('Components/Admin/Subscriptions/Form'));
const AdminTrainersForm = lazy(() => import('Components/Admin/Trainers/Form'));
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
    <>
      <Suspense fallback={<ClipLoader />}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/auth/login" component={Login} />
          <Route exact path="/auth/register" component={SignUp} />
          <Route path="/super-admin">
            <Route exact path="/super-admin/admins" component={SuperAdminAdmins} />
            <Route exact path="/super-admin/admins/form" component={SuperAdminAdminsForm} />
            <Route path="/super-admin/admins/form/:id" component={SuperAdminAdminsForm} />
          </Route>
          <Route path="/member">
            <Route path="/member/activities" component={MemberActivities} />
            <Route path="/member/memberships" component={MemberMembership} />
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
            <Route exact path="/admin/trainers/form" component={AdminTrainersForm} />
            <Route path="/admin/trainers/form/:id" component={AdminTrainersForm} />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </Switch>
      </Suspense>
    </>
  );
};
export default Routes;
