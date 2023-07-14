import React, { useState } from 'react';
import styles from './buttons.module.css';

const ButtonGroup = ({ setActiveComponent, activeComponent }) => {
  const [activeButton, setActiveButton] = useState(activeComponent);

  const handleButtonClick = (component) => {
    setActiveComponent(component);
    setActiveButton(component);
  };

  return (
    <div className={styles.buttons}>
      <button
        className={`${styles.button} ${activeButton === 'subscriptions' ? styles.active : ''}`}
        onClick={() => handleButtonClick('subscriptions')}
      >
        Class subscriptions
      </button>
      <button
        className={`${styles.button} ${activeButton === 'members' ? styles.active : ''}`}
        onClick={() => handleButtonClick('members')}
      >
        Members & memberships
      </button>
      <button
        className={`${styles.button} ${activeButton === 'trainers' ? styles.active : ''}`}
        onClick={() => handleButtonClick('trainers')}
      >
        Class activities and trainers
      </button>
    </div>
  );
};

export default ButtonGroup;
