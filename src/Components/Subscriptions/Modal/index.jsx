import React from 'react';
import styles from './modal.module.css';

function Modal(props) {
  if (!props.show) {
    return null;
  }

  const onCloseModal = () => {
    props.closeModal();
  };

  const onConfirm = () => {
    props.onConfirm();
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <h3>Confirm Deletion</h3>
        <p>Are you sure you want to delete this subscription?</p>
        <div className={styles.buttonContainer}>
          <button className={styles.buttonCancel} onClick={onCloseModal}>
            Cancel
          </button>
          <button className={styles.buttonConfirm} onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
