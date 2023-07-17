import Header from 'Components/Shared/Header';
import Sidebar from 'Components/Shared/Sidebar';
import styles from './layout.module.css';
import Footer from 'Components/Shared/Footer';

const Layout = (props) => {
  return (
    <>
      <Header profileRoute={props.profileRoute} />
      <Sidebar routes={props.routes} rol={props.rol} />
      <div className={styles.center}>{props.children}</div>
      <Footer />
    </>
  );
};

export default Layout;
