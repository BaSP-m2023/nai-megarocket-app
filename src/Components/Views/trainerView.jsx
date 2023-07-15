import Header from 'Components/Shared/Header/index';
import styles from 'Components/Layout/layout.module.css';
import Routes from 'Routes/Routes';
import Sidebar from 'Components/Shared/Sidebar';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const TrainerView = () => {
  const routes = [
    { name: 'Home', link: '/trainers/home', icon: HomeIcon },
    { name: 'Profile', link: '/trainers/profile', icon: PersonIcon },
    { name: 'Classes', link: '/trainers/schedule', icon: CalendarTodayIcon }
  ];
  const rol = 'trainer';
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

export default TrainerView;
