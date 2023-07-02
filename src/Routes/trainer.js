import React, { Suspense, lazy } from 'react';
import { Route } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

const TrainerSchedule = lazy(() => import('Components/Trainer/Schedule'));
const Home = lazy(() => import('Components/Home'));
const TrainerProfile = lazy(() => import('Components/Trainer/Profile'));
const TrainerProfileForm = lazy(() => import('Components/Trainer/Profile/Form'));

const TrainerRoutes = () => {
  return (
    <Suspense fallback={<ClipLoader />}>
      <Route exact path="/trainers/home" component={Home} />
      <Route exact path="/trainers/profile" component={TrainerProfile} />
      <Route path="/trainers/profile/form/:id" component={TrainerProfileForm} />
      <Route exact path="/trainers/schedule" component={TrainerSchedule} />
    </Suspense>
  );
};

export default TrainerRoutes;
