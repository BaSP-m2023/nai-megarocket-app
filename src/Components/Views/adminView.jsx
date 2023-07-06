import styles from 'Components/Layout/layout.module.css';
import Routes from 'Routes/Routes';
import Header from 'Components/Header/index';
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
  return (
    <>
      <Header />
      <div className={styles.body}>
        <Sidebar routes={routes} />
        <Routes />
      </div>
    </>
  );
};

export default AdminView;
