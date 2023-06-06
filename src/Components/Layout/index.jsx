import Header from '../Header/index';
import styles from './layout.module.css';
import Routes from '../../Routes';

const Layout = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Routes />
    </div>
  );
};

export default Layout;
