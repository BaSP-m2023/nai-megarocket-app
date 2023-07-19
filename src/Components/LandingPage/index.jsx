import React from 'react';
import styles from './landing.module.css';
import stylesJoin from './join.module.css';
import stylesTrainers from './trainers.module.css';
import Footer from 'Components/Footer';
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
        <div className={styles.imgPortrait}>
          <img src="/assets/images/landing/portrait.png" alt="gym image" />
          <div className={styles.overlay}>
            <div className={styles.content}>
              <img src="/assets/images/logos/logo-4.png" alt="gym image" />
              <p>it&apos;s gym &#8226; it&apos;s life</p>
            </div>
          </div>
        </div>
        <div className={stylesJoin.joinButtonDiv}>
          <button type="submit" onClick={handleRegister}>
            join our gym
          </button>
        </div>
        <div className={stylesTrainers.trainerContainer}>
          <div className={`${stylesTrainers.trainerBox} ${stylesTrainers.trainer1}`}></div>
          <div className={`${stylesTrainers.trainerBox} ${stylesTrainers.trainer2}`}></div>
          <div className={`${stylesTrainers.trainerBox} ${stylesTrainers.trainer3}`}></div>
          <div className={`${stylesTrainers.trainerBox} ${stylesTrainers.trainer4}`}></div>
          <div className={`${stylesTrainers.trainerBox} ${stylesTrainers.trainer5}`}></div>
        </div>
        <div className={stylesJoin.joined}>
          <p>be fit</p>
          <p className={stylesJoin.dot}>&nbsp;&#8226;&nbsp;</p>
          <p>be happy</p>
          <p className={stylesJoin.dot}>&nbsp;&#8226;&nbsp;</p>
          <p>be megarocket</p>
        </div>
        <div className={stylesJoin.landscape}>
          <button type="submit" className={stylesJoin.joinButtonJoin} onClick={handleRegister}>
            <span>join</span>
          </button>
          <button type="submit" className={stylesJoin.joinButtonNow} onClick={handleRegister}>
            <span>now</span>
          </button>
        </div>
        <ContactForm />
      </div>
      <Footer />
    </>
  );
};

export default Landing;
