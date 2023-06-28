import Header from 'Components/Header/index';
import styles from 'Components/Layout/layout.module.css';
import Routes from 'Routes/Routes';

const LoginView = () => {
  return (
    <>
      <Header />
      <div className={styles.body}>
        <Routes />
      </div>
    </>
  );
};

export default LoginView;
