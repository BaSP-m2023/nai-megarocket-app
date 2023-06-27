import React, { Suspense, lazy } from 'react';
import { Route } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

const MemberActivities = lazy(() => import('Components/Member/Activities'));
const MemberMembership = lazy(() => import('Components/Member/Memberships'));
const MemberProfile = lazy(() => import('Components/Member/Profile'));
const MemberSchedule = lazy(() => import('Components/Member/Schedule'));

const MemberProfileForm = lazy(() => import('Components/Member/Profile/Form'));

const MemberRoutes = () => {
  return (
    <Suspense fallback={<ClipLoader />}>
      <Route path="/members/activities" component={MemberActivities} />
      <Route path="/members/memberships" component={MemberMembership} />
      <Route exact path="/members/profile" component={MemberProfile} />
      <Route path="/members/profile/form/:id" component={MemberProfileForm} />
      <Route exact path="/members/schedule" component={MemberSchedule} />
    </Suspense>
  );
};

export default MemberRoutes;
