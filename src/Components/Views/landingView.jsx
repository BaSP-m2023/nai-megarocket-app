import styles from 'Components/LandingPage/landing.module.css';
import Routes from 'Routes/Routes';

const LandingView = () => {
  return (
    <>
      <div className={styles.body}>
        <Routes />
      </div>
    </>
  );
};

export default LandingView;
