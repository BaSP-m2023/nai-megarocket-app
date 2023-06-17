import Header from 'Components/Header/index';
import styles from './layout.module.css';
import Routes from 'Routes/Routes';
import SideBar from 'Components/SideBar';

const Layout = () => {
  return (
    <div className={styles.container}>
      <Header />
      <SideBar />
      <Routes />
    </div>
  );
};

export default Layout;
