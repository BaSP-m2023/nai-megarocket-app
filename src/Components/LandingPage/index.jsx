import React from 'react';
import styles from './landing.module.css';
import stylesJoin from './join.module.css';
import stylesTrainers from './trainers.module.css';
import Footer from 'Components/Footer';
import Button from 'Components/Shared/Button';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ContactForm from './Form';

const Landing = () => {
  const history = useHistory();

  const handleRegister = () => {
    history.push('/auth/register');
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img
            src="/assets/images/landing/portrait.jpg"
            alt="gym image"
            className={styles.imgPortrait}
          />
          <div className={styles.overlay}>
            <div className={styles.content}>
              <div>
                <h2>mega</h2>
                <h2 className={styles.rocket}>rocket</h2>
              </div>
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
          <div className={`${stylesTrainers.trainerBox} ${stylesTrainers.trainer1}`}></div>
          <div className={`${stylesTrainers.trainerBox} ${stylesTrainers.trainer2}`}></div>
          <div className={`${stylesTrainers.trainerBox} ${stylesTrainers.trainer3}`}></div>
          <div className={`${stylesTrainers.trainerBox} ${stylesTrainers.trainer4}`}></div>
          <div className={`${stylesTrainers.trainerBox} ${stylesTrainers.trainer5}`}></div>
        </div>
        <div className={stylesJoin.joined}>
          <p>be fit &#8226; be happy &#8226; be megarocket</p>
        </div>
        <div className={stylesJoin.landscape}>
          <Button
            testId={'login-button-register'}
            type="submit"
            className={stylesJoin.joinButton}
            text={'join'}
            clickAction={handleRegister}
          />
          <Button
            testId={'login-button-register'}
            type="submit"
            className={stylesJoin.joinButton}
            text={'now'}
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
