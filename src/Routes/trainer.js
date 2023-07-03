import React, { Suspense, lazy } from 'react';
import { Route } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

const Home = lazy(() => import('Components/Home'));
const TrainerProfile = lazy(() => import('Components/Trainer/Profile'));
const TrainerSchedule = lazy(() => import('Components/Trainer/Schedule'));

const TrainerRoutes = () => {
  return (
    <Suspense fallback={<ClipLoader />}>
      <Route exact path="/trainers/home" component={Home} />
      <Route exact path="/trainers/profile" component={TrainerProfile} />
      <Route exact path="/trainers/schedule" component={TrainerSchedule} />
    </Suspense>
  );
};

export default TrainerRoutes;
