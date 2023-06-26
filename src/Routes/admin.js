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
    </Suspense>
  );
};

export default AdminRoutes;
