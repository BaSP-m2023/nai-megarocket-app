import React from 'react';
import styles from './form.module.css';

const SharedForm = ({ children, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className={styles.container}>
      {children}
    </form>
  );
};

export default SharedForm;
