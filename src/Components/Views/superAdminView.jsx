import Header from 'Components/Header/index';
import styles from 'Components/Layout/layout.module.css';
import Routes from 'Routes/Routes';
import Sidebar from 'Components/Shared/Sidebar';

const SuperAdminView = () => {
  const routes = [
    { name: 'Home', link: '/super-admins/home' },
    { name: 'Admins', link: '/super-admins/admins' }
  ];
  const rol = 'super-admin';
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

export default SuperAdminView;
