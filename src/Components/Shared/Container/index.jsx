import React from 'react';
import styles from './container.module.css';

const Container = ({ children, isLogin, center }) => (
  <div className={isLogin ? styles.login : center ? styles.center : styles.container}>
    {children}
  </div>
);

export default Container;
