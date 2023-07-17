import React from 'react';
import styles from './container.module.css';

const Container = ({ children, isLogin, center, realCenter }) => (
  <div
    className={
      isLogin
        ? styles.login
        : center
        ? styles.center
        : realCenter
        ? styles.realCenter
        : styles.container
    }
  >
    {children}
  </div>
);

export default Container;
