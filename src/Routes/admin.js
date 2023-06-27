import React, { Suspense, lazy } from 'react';
import { Route } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

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

const AdminRoutes = () => {
  return (
    <Suspense fallback={<ClipLoader />}>
      <Route exact path="/admins/activities" component={AdminActivities} />
      <Route exact path="/admins/activities/form" component={AdminActivitiesForm} />
      <Route path="/admins/activities/form/:id" component={AdminActivitiesForm} />
      <Route exact path="/admins/profile" component={AdminProfile} />
      <Route exact path="/admins/classes" component={AdminClasses} />
      <Route exact path="/admins/classes/form" component={AdminClassesForm} />
      <Route path="/admins/classes/form/:id" component={AdminClassesForm} />
      <Route exact path="/admins/members" component={AdminMembers} />
      <Route exact path="/admins/members/form" component={AdminMembersForm} />
      <Route path="/admins/members/form/:id" component={AdminMembersForm} />
      <Route exact path="/admins/reports" component={AdminReports} />
      <Route exact path="/admins/subscriptions" component={AdminSubscriptions} />
      <Route exact path="/admins/subscriptions/form" component={AdminSubscriptionsForm} />
      <Route path="/admins/subscriptions/form/:id" component={AdminSubscriptionsForm} />
      <Route exact path="/admins/trainers" component={AdminTrainers} />
      <Route exact path="/admins/trainers/form" component={AdminTrainersForm} />
      <Route path="/admins/trainers/form/:id" component={AdminTrainersForm} />
    </Suspense>
  );
};

export default AdminRoutes;
