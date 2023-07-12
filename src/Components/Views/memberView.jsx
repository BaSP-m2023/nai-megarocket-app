import Header from 'Components/Header/index';
import styles from 'Components/Layout/layout.module.css';
import Routes from 'Routes/Routes';
import Sidebar from 'Components/Shared/Sidebar';

const MemberView = () => {
  const routes = [
    { name: 'Home', link: '/members/home' },
    { name: 'Profile', link: '/members/profile' },
    { name: 'Schedule', link: '/members/schedule' },
    { name: 'Activities', link: '/members/activities' },
    { name: 'Memberships', link: '/members/memberships' }
  ];
  const rol = 'member';
  return (
    <>
      <Header />
      <div className={styles.body}>
        <Sidebar routes={routes} rol={rol} />
        <Routes />
      </div>
    </>
  );
};

export default MemberView;
