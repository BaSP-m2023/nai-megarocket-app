import React from 'react';
import styles from 'Components/Admin/Classes/Modal/modal.module.css';
import Button from 'Components/Shared/Button';
import CloseIcon from '@mui/icons-material/Close';

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
    <div className={styles.modalContainer} id={data.testId}>
      <div className={containerStyle}>
        <div className={styles.closeContainer}>
          <CloseIcon onClick={onClose} id={data.closeTestId} />
          {/* <Button type={'close'} clickAction={onClose} testId={data.closeTestId} /> */}
        </div>
        <h3 className={styles.h3Container}>{data.classTitle}</h3>
        <p className={styles.pContainer}>{data.classDay}</p>
        <p className={styles.pContainer}>{data.classTrainer}</p>
        <p className={styles.pContainer}>{data.classSlots}</p>
        <div className={styles.buttonContainer}>
          <Button
            type="confirm"
            text={'Edit'}
            clickAction={onCloseModal}
            testId={data.editTestId}
          />
          <Button
            type="confirm"
            text={'Delete'}
            clickAction={onConfirm}
            testId={data.confirmDeleteTestId}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarModal;
