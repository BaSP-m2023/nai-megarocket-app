import React from 'react';
import styles from './landing.module.css';
import Footer from 'Components/Footer';

const Landing = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.videoContainer}>
          {/* <video className={styles.video} autoPlay muted loop>
            <source src="/assets/video/promo.mp4" type="video/mp4" />
          </video> */}
          <img src="/assets/images/landing/img-gym-001.jpg" alt="gym image" />
        </div>
        <div className={styles.mask}></div>
        <div className={styles.content}>
          <h2>megarocket</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
        <div></div>
        <div>
          <h2>publi</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
        <div>
          <h2>schedule</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
        <div>
          <h2>memberships</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Landing;
