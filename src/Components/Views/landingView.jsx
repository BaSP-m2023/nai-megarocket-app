import styles from 'Components/LandingPage/landing.module.css';
import Routes from 'Routes/Routes';
import Header from 'Components/Header/index';

const LandingView = () => {
  return (
    <>
      <Header />
      <div className={styles.body}>
        <Routes />
      </div>
    </>
  );
};

export default LandingView;
