import React from 'react';
import styles from './super-admins.module.css';

function Modal(props) {
  if (!props.showModal) {
    return null;
  }

  const deleteItem = () => {
    props.confirmModal();
    props.closeModal();
    alert('Super Admin Deleted');
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <h3>{props.warning}</h3>
        <div className={styles.modalButtons}>
          <button className={styles.modalButton} onClick={deleteItem}>
            Yes
          </button>
          <button className={styles.modalButton} onClick={props.closeModal}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
