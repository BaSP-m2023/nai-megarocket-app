import Header from '../Header/index';
import styles from './layout.module.css';
import Routes from '../../Routes';
import { SideBar } from '../SideBar';

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
