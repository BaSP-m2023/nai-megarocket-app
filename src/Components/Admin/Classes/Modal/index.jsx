import React from 'react';
import styles from 'Components/Admin/Classes/Modal/modal.module.css';
import Button from 'Components/Shared/Button';

const CalendarModal = (data) => {
  let containerStyle;

  if (!data.show) {
    return null;
  }

  const onCloseModal = () => {
    data.closeModal();
  };

  const onConfirm = () => {
    data.onConfirm();
  };

  const onClose = () => {
    data.onClose();
  };

  switch (data.typeStyle) {
    case 'success':
      containerStyle = styles.modalContentSuccess;
      break;
    case 'error':
      containerStyle = styles.modalContentError;
      break;
    default:
      containerStyle = styles.modalContentDefault;
      break;
  }

  return (
    <div className={styles.modalContainer}>
      <div className={containerStyle}>
        <div className={styles.closeContainer}>
          <Button type={'delete'} clickAction={onClose} />
        </div>
        <h3 className={styles.h3Container}>{data.title}</h3>
        <p className={styles.pContainer}>{data.body}</p>
        <div className={styles.buttonContainer}>
          <Button type="confirm" text={'Edit'} clickAction={onCloseModal} />
          <Button type="confirm" text={'Delete'} clickAction={onConfirm} />
        </div>
      </div>
    </div>
  );
};

export default CalendarModal;
