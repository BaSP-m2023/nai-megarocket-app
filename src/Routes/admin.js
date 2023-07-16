import Layout from 'Components/Layout';
import React, { Suspense, lazy } from 'react';
import { Route } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SportsHandballIcon from '@mui/icons-material/SportsHandball';
import CalendarMonthSharpIcon from '@mui/icons-material/CalendarMonthSharp';
import GroupIcon from '@mui/icons-material/Group';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import StarsIcon from '@mui/icons-material/Stars';
import AssessmentIcon from '@mui/icons-material/Assessment';
import Container from 'Components/Shared/Container';

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
const Home = lazy(() => import('Components/Home'));

const AdminRoutes = () => {
  const routes = [
    { name: 'Home', link: '/admins/home', icon: HomeIcon },
    { name: 'Profile', link: '/admins/profile', icon: PersonIcon },
    { name: 'Activities', link: '/admins/activities', icon: SportsHandballIcon },
    { name: 'Classes', link: '/admins/classes', icon: CalendarMonthSharpIcon },
    { name: 'Members', link: '/admins/members', icon: GroupIcon },
    { name: 'Trainers', link: '/admins/trainers', icon: SupervisedUserCircleIcon },
    { name: 'Subscriptions', link: '/admins/subscriptions', icon: StarsIcon },
    { name: 'Reports', link: '/admins/reports', icon: AssessmentIcon }
  ];
  const rol = 'admin';

  return (
    <Layout routes={routes} rol={rol}>
      <Suspense
        fallback={
          <Container center={true}>
            <ClipLoader />
          </Container>
        }
      >
        <Route exact path="/admins/home" component={Home} />
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
    </Layout>
  );
};

export default AdminRoutes;
