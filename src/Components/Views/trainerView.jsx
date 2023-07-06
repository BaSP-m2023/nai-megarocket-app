import Header from 'Components/Header/index';
import styles from 'Components/Layout/layout.module.css';
import Routes from 'Routes/Routes';
import Sidebar from 'Components/Shared/Sidebar';

const TrainerView = () => {
  const routes = [
    { name: 'Home', link: '/trainers/home' },
    { name: 'Profile', link: '/trainers/profile' },
    { name: 'Classes', link: '/trainers/schedule' }
  ];
  return (
    <>
      <Header />
      <div className={styles.body}>
        <Sidebar routes={routes} />
        <Routes />
      </div>
    </>
  );
};

export default TrainerView;
