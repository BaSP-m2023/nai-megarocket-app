import Header from '../Header/index';
import Footer from '../Footer/index';
import styles from './layout.module.css';
import Routes from '../../Routes';

const Layout = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Routes />
      <Footer />
    </div>
  );
};

export default Layout;
