import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Container from 'Components/Shared/Container';

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

  return (
    <Container isLogin={true}>
      {roleSession ? (
        <>
          <h2>This is a private section.</h2>
        </>
      ) : (
        <>
          <h2>
            You are not signed in. You will be redirected to the Login form in {countdown}{' '}
            seconds...
          </h2>
        </>
      )}
    </Container>
  );
};

export default NotAllowed;
