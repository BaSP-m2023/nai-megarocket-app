import Container from 'Components/Shared/Container';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import styles from 'Components/Home/home.module.css';

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
    <>
      <Toaster
        containerStyle={{
          margin: '10vh 0 0 0'
        }}
      />
      <Container className={styles.container}>
        <h2 className={styles.title}>
          Welcome to MEGAROCKET, {user?.firstName} {user?.lastName ? ' ' + user?.lastName : ''} !
        </h2>
        <div className={styles.slider}>
          <ul>
            <li>
              <img src={`${process.env.PUBLIC_URL}/assets/images/Home/372927100.jpg`} alt="" />
            </li>
            <li>
              <img src={`${process.env.PUBLIC_URL}/assets/images/Home/372927101.jpg`} alt=""></img>
            </li>
            <li>
              <img src={`${process.env.PUBLIC_URL}/assets/images/Home/372927102.jpg`} alt=""></img>
            </li>
          </ul>
        </div>
      </Container>
    </>
  );
};

export default Home;
