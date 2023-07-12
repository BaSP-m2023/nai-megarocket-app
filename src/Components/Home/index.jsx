import Container from 'Components/Shared/Container';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import styles from './home.module.css';
import { useSelector } from 'react-redux';

const Home = () => {
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    toast.remove();
    let toastMessage = localStorage.getItem('toastMessage');
    if (toastMessage) {
      toastMessage = `Welcome back, ${user?.firstName}${
        user?.lastName ? ' ' + user?.lastName : ''
      }!`;
      showToast(toastMessage, 'success');
      localStorage.removeItem('toastMessage');
    }
  }, []);

  const showToast = (message, type) => {
    if (type === 'success') {
      toast.success(message, {
        duration: 2500,
        position: 'top-right',
        style: {
          background: '#fddba1'
        },
        icon: '💪'
      });
    } else if (type === 'error') {
      toast.error(message, {
        duration: 2500,
        position: 'top-right',
        style: {
          background: 'rgba(227, 23, 10, 0.5)'
        },
        iconTheme: {
          primary: '#0f232e',
          secondary: '#fff'
        }
      });
    }
  };

  return (
    <div className={styles.container}>
      <Container>
        <Toaster />
        <h2>Welcome to MEGAROCKET</h2>
      </Container>
    </div>
  );
};

export default Home;
