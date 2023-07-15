import { useState } from 'react';
import styles from './modalShedule.module.css';
import Button from 'Components/Shared/Button';
import { BsCheck, BsFillPersonVcardFill, BsXLg } from 'react-icons/bs';
import { useDispatch } from 'react-redux';

import { createSubscription, deleteSubscription } from 'Redux/subscriptions/thunks';

const Modal = (data) => {
  const dispatch = useDispatch();
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  if (!data.show) {
    return null;
  }

  const onCloseModal = () => {
    data.closeModal();
  };

  const showToast = (message, type) => {
    if (type === 'success') {
      data.toast.success(message, {
        duration: 3000,
        position: 'top-right',
        style: {
          background: '#fddba1'
        },
        iconTheme: {
          primary: '#0f232e',
          secondary: '#fff'
        }
      });
    } else if (type === 'error') {
      data.toast.error(message, {
        duration: 3000,
        position: 'top-right',
        style: {
          background: 'rgba(227, 23, 10, 0.5)'
        },
        iconTheme: {
          primary: '#0f232e',
          secondary: '#fff'
        }
      });
    }
  };

  const handleSubscribe = async () => {
    if (isButtonDisabled) {
      return;
    }
    setButtonDisabled(true);
    if (data.idSuscription) {
      try {
        await dispatch(deleteSubscription(data.idSuscription));
        showToast(`Succesfully removed from ${data.activity}`, 'success');
        data.closeModal();
      } catch (error) {
        showToast(error.message, 'error');
        data.closeModal();
      }
    } else {
      try {
        const newDate = new Date();
        const newSuscription = {
          classes: data.idClass,
          member: data.idMember,
          date: newDate.setHours(newDate.getHours() - 3),
          isActive: true
        };
        await dispatch(createSubscription(newSuscription));
        showToast(`Succesfully subscribed to ${data.activity}`, 'success');
        data.closeModal();
      } catch (error) {
        showToast(error.message, 'error');
        data.closeModal();
      }
    }
    setButtonDisabled(false);
  };

  return (
    <div id="member-schedule-modal" className={styles.modalContainer}>
      <div className={styles.modalContentDefault}>
        <div className={styles.closeContainer}>
          <div
            id="member-schedule-modal-button-close"
            className={styles.close}
            onClick={onCloseModal}
          >
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
        {data.slot <= data.slotCount ? (
          <div className={styles.slotsFull}>
            Slots full {data.slotCount} / {data.slot}
          </div>
        ) : (
          <div className={styles.center}>
            Slots: {data.slotCount} / {data.slot}
          </div>
        )}
        {data.membership === 'Classic' ? (
          <div className={styles.center}>
            You cannot enroll in classes. Upgrade your membership!
          </div>
        ) : data.idSuscription ? (
          <div className={styles.added}>
            <BsCheck /> You are subscribed to this class
          </div>
        ) : (
          <div className={styles.center}>You are not in this class</div>
        )}
        <div className={styles.buttonContainer}>
          {data.slot <= data.slotCount && !data.idSuscription ? (
            <Button
              type="cancel"
              testId={'member-schedule-button-back-modal'}
              text={<>Back</>}
              clickAction={onCloseModal}
            />
          ) : (
            <Button
              type="cancel"
              testId={
                data.idSuscription
                  ? 'member-schedule-modal-button-unsubscribe'
                  : 'member-schedule-modal-button-subscribe'
              }
              text={data.idSuscription ? <>Unsubscribe</> : <>Subscribe</>}
              clickAction={handleSubscribe}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
