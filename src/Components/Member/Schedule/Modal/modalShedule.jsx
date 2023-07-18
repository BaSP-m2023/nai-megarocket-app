import { useState } from 'react';
import styles from './modalShedule.module.css';
import Button from 'Components/Shared/Button';
import { BsCheck, BsFillPersonVcardFill, BsXLg } from 'react-icons/bs';
import { useDispatch } from 'react-redux';

import { updateSubscription, createSubscription } from 'Redux/subscriptions/thunks';

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
        duration: 2500,
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
        duration: 2500,
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
        const updateSuscription = {
          isActive: false
        };
        await dispatch(updateSubscription(updateSuscription, data.idSuscription));
        showToast('Subscription was succesfully removed', 'success');
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
        showToast('Subscription was succesfully added', 'success');
        data.closeModal();
      } catch (error) {
        showToast(error.message, 'error');
        data.closeModal();
      }
    }
    setButtonDisabled(false);
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
        {data.slot <= data.slotCount ? (
          <div className={styles.slotsFull}>
            Slots full {data.slotCount} / {data.slot}
          </div>
        ) : (
          <div className={styles.center}>
            Slots: {data.slotCount} / {data.slot}
          </div>
        )}
        {data.membership === 'Classic' || data.membership === 'none' ? (
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
          {data.slot <= data.slotCount ||
          data.membership === 'Classic' ||
          data.membership === 'none' ||
          !data.idSuscription ? (
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
    </div>
  );
};

export default Modal;
