import React from 'react';
import { useState } from 'react';
import Button from 'Components/Shared/Button';
import styles from './form.module.css';
import SharedModal from 'Components/Shared/Modal/index';

const ContactForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [typeStyle, setTypeStyle] = useState('');
  const [titleModal, setTitleModal] = useState('');
  const [bodyModal, setBodyModal] = useState('');

  const onSubmit = async () => {
    event.preventDefault();
    setTypeStyle();
    setTitleModal('Email sent');
    setBodyModal('');
    setShowModal(true);
  };

  const handleCloseModal = () => {
    try {
      setShowModal(false);
    } catch (error) {
      setShowModal(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>contact us</h2>
      <form onSubmit={onSubmit} className={styles.form}>
        <div className={styles.inputsDiv}>
          <div className={styles.leftFieldset}>
            <input placeholder={'First Name'} type={'text'} className={styles.input} />
            <input placeholder={'Last Name'} type={'text'} className={styles.input} />
          </div>
          <div className={styles.rightFieldset}>
            <input placeholder={'Email'} type={'text'} className={styles.input} />
            <input placeholder={'Phone'} type={'text'} className={styles.input} />
          </div>
        </div>
        <div className={styles.buttonsDiv}>
          <Button text={'Send'} type="submit" info={'submit'} />
        </div>
      </form>
      {showModal && (
        <SharedModal
          show={showModal}
          typeStyle={typeStyle}
          title={titleModal}
          body={bodyModal}
          closeModal={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ContactForm;
