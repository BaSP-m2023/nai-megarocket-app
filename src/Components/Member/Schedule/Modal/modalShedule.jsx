import React, { useState } from 'react';
import styles from './modalShedule.module.css';
import Button from 'Components/Shared/Button';
import { BsCheck, BsFillPersonVcardFill, BsXLg } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import SharedModal from 'Components/Shared/Modal';
import { deleteSubscription, createSubscription } from 'Redux/subscriptions/thunks';

const Modal = (data) => {
  const [showAlert, setShowAlert] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const dispatch = useDispatch();

  if (!data.show) {
    return null;
  }

  const onCloseModal = () => {
    data.closeModal();
    setShowAlert(false);
  };

  const handleSubscribe = async () => {
    if (data.added) {
      try {
        await dispatch(deleteSubscription(data.idSuscription));
        setShowAlert(true);
        setIsSuccess(true);
        setAlertMessage('Unsubscription success');
      } catch (error) {
        console.error(error.message);
        setShowAlert(true);
        setIsSuccess(false);
        setAlertMessage(error.message);
      }
    } else {
      try {
        const newSuscription = {
          classes: data.idClass,
          member: data.idMember,
          date: new Date()
        };
        await dispatch(createSubscription(newSuscription));
        setShowAlert(true);
        setIsSuccess(true);
        setAlertMessage('Subscription success');
      } catch (error) {
        console.error(error.message);
        setShowAlert(true);
        setIsSuccess(false);
        setAlertMessage(error.message);
      }
    }
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContentDefault}>
        <div className={styles.closeContainer}>
          <div className={styles.close} onClick={onCloseModal}>
            <BsXLg />
          </div>
        </div>
        <h3 className={styles.h3Container}>
          Class {data.day.length > 1 ? data.day.join(' - ') : data.day} {data.hour} Hs
        </h3>
        <div className={styles.activity}>{data.activity}</div>
        <div className={styles.center}>Trainer:</div>
        <div className={styles.trainer}>
          <BsFillPersonVcardFill />
          <span className={styles.space}></span>
          {data.trainer}
        </div>
        <div className={styles.center}>Slots: {data.slot}</div>
        {data.added ? (
          <div className={styles.added}>
            <BsCheck /> You are subscribed to this class
          </div>
        ) : (
          <div className={styles.center}>You are not in this class</div>
        )}
        <div className={styles.buttonContainer}>
          <Button
            type="cancel"
            text={data.added ? <>Unsubscribe</> : <>Subscribe</>}
            clickAction={handleSubscribe}
          />
        </div>
      </div>
      <SharedModal
        isDelete={false}
        show={showAlert}
        closeModal={onCloseModal}
        typeStyle={isSuccess ? 'success' : 'error'}
        title={isSuccess ? 'Success' : 'Something went wrong'}
        body={alertMessage}
      />
    </div>
  );
};

export default Modal;
