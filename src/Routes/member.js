import Layout from 'Components/Layout';
import React, { Suspense, lazy } from 'react';
import { Route } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SportsHandballIcon from '@mui/icons-material/SportsHandball';
import ContactEmergencySharpIcon from '@mui/icons-material/ContactEmergencySharp';
import CalendarMonthSharpIcon from '@mui/icons-material/CalendarMonthSharp';

const MemberActivities = lazy(() => import('Components/Member/Activities'));
const MemberMembership = lazy(() => import('Components/Member/Memberships'));
const MemberProfile = lazy(() => import('Components/Member/Profile'));
const MemberSchedule = lazy(() => import('Components/Member/Schedule'));
const Home = lazy(() => import('Components/Home'));

const MemberRoutes = () => {
  const routes = [
    { name: 'Home', link: '/members/home', icon: HomeIcon },
    { name: 'Profile', link: '/members/profile', icon: PersonIcon },
    { name: 'Schedule', link: '/members/schedule', icon: CalendarMonthSharpIcon },
    { name: 'Activities', link: '/members/activities', icon: SportsHandballIcon },
    { name: 'Memberships', link: '/members/memberships', icon: ContactEmergencySharpIcon }
  ];
  const rol = 'member';

  return (
    <Layout routes={routes} rol={rol} profileRoute={routes[1].link}>
      <Suspense fallback={<ClipLoader />}>
        <Route exact path="/members/home" component={Home} />
        <Route path="/members/activities" component={MemberActivities} />
        <Route path="/members/memberships" component={MemberMembership} />
        <Route exact path="/members/profile" component={MemberProfile} />
        <Route exact path="/members/schedule" component={MemberSchedule} />
      </Suspense>
    </Layout>
  );
};

export default MemberRoutes;
