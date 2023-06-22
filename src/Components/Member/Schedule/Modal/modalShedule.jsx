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
    if (data.idSuscription) {
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
        const newDate = new Date();
        const newSuscription = {
          classes: data.idClass,
          member: data.idMember,
          date: newDate.setHours(newDate.getHours() - 3)
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
        <div className={styles.centerTitle}>
          Class {data.day.length > 1 ? data.day.join(' - ') : data.day} {data.hour} Hs
        </div>
        <div className={styles.activity}>{data.activity}</div>
        <div className={styles.center}>Trainer:</div>
        <div className={styles.trainer}>
          <div className={styles.trainerIcon}>
            <BsFillPersonVcardFill />
          </div>
          <span className={styles.space}></span>
          {data.trainer}
        </div>
        {data.slot < data.slotCount ? (
          <div className={styles.slotsFull}>Slots full</div>
        ) : (
          <div className={styles.center}>
            Slots: {data.slotCount} / {data.slot}
          </div>
        )}
        {data.idSuscription ? (
          <div className={styles.added}>
            <BsCheck /> You are subscribed to this class
          </div>
        ) : (
          <div className={styles.center}>You are not in this class</div>
        )}
        <div className={styles.buttonContainer}>
          {data.slot < data.slotCount ? (
            <Button type="cancel" text={<>Back</>} clickAction={onCloseModal} />
          ) : (
            <Button
              type="cancel"
              text={data.idSuscription ? <>Unsubscribe</> : <>Subscribe</>}
              clickAction={handleSubscribe}
            />
          )}
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
