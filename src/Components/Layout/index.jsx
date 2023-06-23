import Header from 'Components/Header/index';
import styles from './layout.module.css';
import Routes from 'Routes/Routes';
import SideBar from 'Components/SideBar';

const Layout = () => {
  return (
    <>
      <Header />
      <div className={styles.body}>
        <SideBar />
        <Routes />
      </div>
    </>
  );
};

export default Layout;
