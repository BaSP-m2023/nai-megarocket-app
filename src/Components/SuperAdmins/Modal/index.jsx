import React from 'react';
import styles from './super-admins.module.css';

function Modal(props) {
  if (!props.showDeleteWarning) {
    return null;
  }

  const confirmDelete = () => {
    props.confirmDelete();
    props.closeWarning();
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <h3>{props.warningMsg}</h3>
        <div className={styles.modalButtons}>
          <button className={styles.modalButton} onClick={confirmDelete}>
            Yes
          </button>
          <button className={styles.modalButton} onClick={props.closeWarning}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
