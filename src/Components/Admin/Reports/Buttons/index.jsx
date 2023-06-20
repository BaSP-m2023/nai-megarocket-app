import React, { useState } from 'react';
import styles from './buttons.module.css';

const ButtonGroup = ({ setActiveComponent }) => {
  const [activeButton, setActiveButton] = useState('activities');

  const handleButtonClick = (component) => {
    setActiveComponent(component);
    setActiveButton(component);
  };

  return (
    <div className={styles.buttons}>
      <button
        className={`${styles.button} ${activeButton === 'members' ? styles.active : ''}`}
        onClick={() => handleButtonClick('members')}
      >
        Members
      </button>
      <button
        className={`${styles.button} ${activeButton === 'activities' ? styles.active : ''}`}
        onClick={() => handleButtonClick('activities')}
      >
        Activities
      </button>
      <button
        className={`${styles.button} ${activeButton === 'memberships' ? styles.active : ''}`}
        onClick={() => handleButtonClick('memberships')}
      >
        Memberships
      </button>
    </div>
  );
};

export default ButtonGroup;
