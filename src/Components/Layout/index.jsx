import Header from 'Components/Header/index';
import styles from './layout.module.css';
import Routes from 'Routes/Routes';
import SideBar from 'Components/SideBar';

const Layout = () => {
  const activeRole = sessionStorage.getItem('role');
  return (
    <>
      <Header />
      <div className={styles.body}>
        <SideBar initialRole={activeRole} />
        <Routes />
      </div>
    </>
  );
};

export default Layout;
