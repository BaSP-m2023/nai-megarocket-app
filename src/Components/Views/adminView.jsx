import styles from 'Components/Layout/layout.module.css';
import Routes from 'Routes/Routes';
import Header from 'Components/Shared/Header/index';
import Sidebar from 'Components/Shared/Sidebar';

const AdminView = () => {
  const routes = [
    { name: 'Home', link: '/admins/home' },
    { name: 'Profile', link: '/admins/profile' },
    { name: 'Activities', link: '/admins/activities' },
    { name: 'Classes', link: '/admins/classes' },
    { name: 'Members', link: '/admins/members' },
    { name: 'Trainers', link: '/admins/trainers' },
    { name: 'Subscriptions', link: '/admins/subscriptions' },
    { name: 'Reports', link: '/admins/reports' }
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
