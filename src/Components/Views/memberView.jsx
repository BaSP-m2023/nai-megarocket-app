import Header from 'Components/Shared/Header/index';
import styles from 'Components/Layout/layout.module.css';
import Routes from 'Routes/Routes';
import Sidebar from 'Components/Shared/Sidebar';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SportsHandballIcon from '@mui/icons-material/SportsHandball';
import ContactEmergencySharpIcon from '@mui/icons-material/ContactEmergencySharp';
import CalendarMonthSharpIcon from '@mui/icons-material/CalendarMonthSharp';

const MemberView = () => {
  const routes = [
    { name: 'Home', link: '/members/home', icon: HomeIcon },
    { name: 'Profile', link: '/members/profile', icon: PersonIcon },
    { name: 'Schedule', link: '/members/schedule', icon: CalendarMonthSharpIcon },
    { name: 'Activities', link: '/members/activities', icon: SportsHandballIcon },
    { name: 'Memberships', link: '/members/memberships', icon: ContactEmergencySharpIcon }
  ];
  const rol = 'member';
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

export default MemberView;
