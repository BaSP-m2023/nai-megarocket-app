import React from 'react';
import styles from './modal.module.css';

const SharedModal = (props) => {
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
        <p>{props.body}</p>
        <div className={styles.buttonContainer}>
          {props.isDelete ? (
            <>
              <button className={styles.buttonCancel} onClick={onCloseModal}>
                Cancel
              </button>
              <button className={styles.buttonConfirm} onClick={onConfirm}>
                Confirm
              </button>
            </>
          ) : (
            <button className={styles.noButton} onClick={onCloseModal}>
              Ok
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SharedModal;
