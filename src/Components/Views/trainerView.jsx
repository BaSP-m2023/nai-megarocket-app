import Header from 'Components/Shared/Header/index';
import styles from 'Components/Layout/layout.module.css';
import Routes from 'Routes/Routes';
import Sidebar from 'Components/Shared/Sidebar';

const TrainerView = () => {
  const routes = [
    { name: 'Home', link: '/trainers/home' },
    { name: 'Profile', link: '/trainers/profile' },
    { name: 'Classes', link: '/trainers/schedule' }
  ];
  const rol = 'trainer';
  return (
    <>
      <Header />
      <div className={styles.body}>
        <Sidebar routes={routes} rol={rol} />
        <Routes />
      </div>
    </>
  );
};

export default TrainerView;
