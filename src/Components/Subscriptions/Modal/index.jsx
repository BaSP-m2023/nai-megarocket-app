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
        <h3>{props.title}</h3>
        <p>{props.message}</p>
        <div className={styles.buttonContainer}>
          {props.showCancel && (
            <button className={styles.buttonCancel} onClick={onCloseModal}>
              Cancel
            </button>
          )}
          <button className={styles.buttonConfirm} onClick={onConfirm}>
            {props.confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
