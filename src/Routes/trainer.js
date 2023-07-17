import Layout from 'Components/Layout';
import React, { Suspense, lazy } from 'react';
import { Route } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const Home = lazy(() => import('Components/Home'));
const TrainerProfile = lazy(() => import('Components/Trainer/Profile'));
const TrainerSchedule = lazy(() => import('Components/Trainer/Schedule'));

const TrainerRoutes = () => {
  const routes = [
    { name: 'Home', link: '/trainers/home', icon: HomeIcon },
    { name: 'Profile', link: '/trainers/profile', icon: PersonIcon },
    { name: 'Classes', link: '/trainers/schedule', icon: CalendarTodayIcon }
  ];
  const rol = 'trainer';

  return (
    <Layout routes={routes} rol={rol} profileRoute={routes[1].link}>
      <Suspense fallback={<ClipLoader />}>
        <Route exact path="/trainers/home" component={Home} />
        <Route exact path="/trainers/profile" component={TrainerProfile} />
        <Route exact path="/trainers/schedule" component={TrainerSchedule} />
      </Suspense>
    </Layout>
  );
};

export default TrainerRoutes;
