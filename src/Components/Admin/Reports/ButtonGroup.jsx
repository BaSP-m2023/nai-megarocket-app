import React from 'react';
import styles from './reports.module.css';
const ButtonGroup = ({ setActiveComponent }) => {
  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className={styles.buttons}>
      <button className={styles.button} onClick={() => handleButtonClick('members')}>
        Members
      </button>
      <button className={styles.button} onClick={() => handleButtonClick('activities')}>
        Activities
      </button>
      <button className={styles.button} onClick={() => handleButtonClick('memberships')}>
        Memberships
      </button>
    </div>
  );
};

export default ButtonGroup;
