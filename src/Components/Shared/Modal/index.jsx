import React from 'react';
import styles from './modal.module.css';
import Button from '../Button';

const SharedModal = (data) => {
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
        <h3 className={styles.h3Container}>{data.title}</h3>
        <p className={styles.pContainer}>{data.body}</p>
        <div className={styles.buttonContainer}>
          {data.isDelete ? (
            <>
              <Button
                type="cancel"
                text={'Cancel'}
                clickAction={onCloseModal}
                testId={data.closeTestId}
              />
              <Button
                type="confirm"
                text={'Confirm'}
                clickAction={onConfirm}
                testId={data.confirmDeleteTestId}
              />
            </>
          ) : (
            <Button
              type="confirm"
              text={'Confirm'}
              clickAction={onCloseModal}
              testId={data.closeTestId}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SharedModal;
