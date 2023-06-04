import React from 'react';
import styles from './modal.module.css';

const SharedModal = (data) => {
  if (!data.show) {
    return null;
  }

  const onCloseModal = () => {
    data.closeModal();
  };

  const onConfirm = () => {
    data.onConfirm();
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <h3>{data.title}</h3>
        <p>{data.body}</p>
        <div className={styles.buttonContainer}>
          {data.isDelete ? (
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
