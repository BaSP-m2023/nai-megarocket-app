import React from 'react';
import styles from './container.module.css';

const Container = ({ children, isLogin }) => (
  <div className={isLogin ? styles.login : styles.container}>{children}</div>
);

export default Container;
