import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from 'Components/Shared/Header/index';
import styles from './notAllowed.module.css';
import Button from '@mui/material/Button';

const NotAllowed = () => {
  const history = useHistory();
  const roleSession = sessionStorage.getItem('role');
  const [countdown, setCountdown] = useState(5);

  if (roleSession === null) {
    useEffect(() => {
      const timer = setTimeout(() => {
        if (countdown > 0) {
          setCountdown(countdown - 1);
        } else {
          history.push('/auth/login');
        }
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }, [countdown, history]);
  }

  const goHome = () => {
    history.push('/landing');
  };

  const goBack = () => {
    history.goBack();
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        {roleSession ? (
          <>
            <div className={styles.notAllowedContainer}>
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/Not-allowed/securecross.png`}
                alt="Secure-image"
              />
              <h3>This content is not available at the moment.</h3>
              <p>
                You do not have access to this route or your account has been deactivated, please
                contact an admin.
              </p>
              <Button
                variant="contained"
                id={'go-home-button-notAllowed'}
                sx={{ width: '10vw', fontSize: '16px' }}
                onClick={goHome}
              >
                home
              </Button>
              <a className={styles.backLink} id="go-back-button-notAllowed" onClick={goBack}>
                Go back
              </a>
            </div>
          </>
        ) : (
          <>
            <div className={styles.notAllowedContainer2}>
              <img
                src={`${process.env.PUBLIC_URL}/assets/images/Not-allowed/secureheight.png`}
                alt="Secure-image"
              />
              <h3>
                You are not logged in. You will be redirected to the Login in {countdown} seconds...
              </h3>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default NotAllowed;
