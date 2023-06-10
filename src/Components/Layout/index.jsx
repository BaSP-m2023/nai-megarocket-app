import Header from '../Header/index';
import styles from './layout.module.css';
import Routes from '../../Routes';
import { Provider } from 'react-redux';
import store from '../redux/store';

const Layout = () => {
  return (
    <Provider store={store}>
      <div className={styles.container}>
        <Header />
        <Routes />
      </div>
    </Provider>
  );
};

export default Layout;
