import React from 'react';
import styles from './landing.module.css';
import stylesForm from './form.module.css';
import stylesTrainers from './trainers.module.css';
import Footer from 'Components/Footer';

const Landing = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img src="/assets/images/landing/img-gym-001.jpg" alt="gym image" />
          <div className={styles.overlay}>
            <div className={styles.content}>
              <h2>megarocket</h2>
              <p>it&apos;s gym. it&apos;s life</p>
            </div>
          </div>
        </div>
        <div></div>
        <div className={styles.joined}>
          <h2>join our gym</h2>
        </div>
        <div className={stylesTrainers.trainerContainer}>
          <img className={stylesTrainers.trainer1}></img>
          <img className={stylesTrainers.trainer2}></img>
          <img className={stylesTrainers.trainer3}></img>
          <img className={stylesTrainers.trainer4}></img>
          <img className={stylesTrainers.trainer5}></img>
        </div>
        <div className={styles.joined}>
          <p>be fit - be happy - be megarocket</p>
        </div>
        <div className={stylesForm.formContainer}>
          <h2>join now</h2>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Landing;
