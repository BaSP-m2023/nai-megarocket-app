import React from 'react';
import styles from './modal.module.css';

function Modal(props) {
  if (!props.show) {
    return null;
  }

  const onCloseModal = () => {
    props.closeModal();
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <h3>Confirm Delete</h3>
        <p>Subscription deleted!</p>
        <div>
          <button className={styles.buttonOk} onClick={onCloseModal}>
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
