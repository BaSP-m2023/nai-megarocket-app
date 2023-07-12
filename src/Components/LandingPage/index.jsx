import React from 'react';
import styles from './landing.module.css';
import stylesJoin from './join.module.css';
import stylesTrainers from './trainers.module.css';
import Footer from 'Components/Footer';
import Button from 'Components/Shared/Button';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ContactForm from './Form';
import Header from 'Components/Shared/Header/index';

const Landing = () => {
  const history = useHistory();

  const handleRegister = () => {
    history.push('/auth/register');
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img
            src="/assets/images/landing/img-gym-001.jpg"
            alt="gym image"
            className={styles.imgPortrait}
          />
          <div className={styles.overlay}>
            <div className={styles.content}>
              <img src="/assets/images/logos/logo-2.png" alt="gym image" />
              <p>
                it&apos;s gym <span className={styles.bullet}>&#8226;</span> it&apos;s life
              </p>
            </div>
          </div>
        </div>
        <div className={stylesJoin.joinButtonDiv}>
          <Button
            testId={'login-button-register'}
            type="submit"
            text={'join our gym'}
            clickAction={handleRegister}
          />
        </div>
        <div className={stylesTrainers.trainerContainer}>
          <div className={stylesTrainers.trainer1}></div>
          <div className={stylesTrainers.trainer2}></div>
          <div className={stylesTrainers.trainer3}></div>
          <div className={stylesTrainers.trainer4}></div>
          <div className={stylesTrainers.trainer5}></div>
        </div>
        <div className={stylesJoin.joined}>
          <p>be fit &#8226; be happy &#8226; be megarocket</p>
        </div>
        <div className={stylesJoin.landscape}>
          <Button
            testId={'login-button-register'}
            type="submit"
            className={stylesJoin.joinButton}
            text={'join now'}
            clickAction={handleRegister}
          />
        </div>
        <ContactForm />
      </div>
      <Footer />
    </>
  );
};

export default Landing;
