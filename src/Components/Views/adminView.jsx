import styles from 'Components/Layout/layout.module.css';
import Routes from 'Routes/Routes';
import Header from 'Components/Shared/Header/index';
import Sidebar from 'Components/Shared/Sidebar';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SportsHandballIcon from '@mui/icons-material/SportsHandball';
import CalendarMonthSharpIcon from '@mui/icons-material/CalendarMonthSharp';
import GroupIcon from '@mui/icons-material/Group';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import StarsIcon from '@mui/icons-material/Stars';
import AssessmentIcon from '@mui/icons-material/Assessment';

const AdminView = () => {
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
    <>
      <Header profileRoute={routes[1].link} />
      <div className={styles.body}>
        <Sidebar routes={routes} rol={rol} />
        <Routes />
      </div>
    </>
  );
};

export default AdminView;
