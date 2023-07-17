import React, { useState } from 'react';
import Button from 'Components/Shared/Button';
import styles from './form.module.css';
import SharedModal from 'Components/Shared/Modal/index';
import Form from 'Components/Shared/Form';
import Input from 'Components/Shared/Input';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import memberValidation from 'Validations/Admin/members';

const ContactForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [typeStyle, setTypeStyle] = useState('');
  const [titleModal, setTitleModal] = useState('');
  const [bodyModal, setBodyModal] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'all',
    resolver: joiResolver(memberValidation)
  });

  const onSubmit = (data) => {
    setTypeStyle();
    setTitleModal('Mail send');
    setBodyModal('');
    setShowModal(true);
    console.log(data);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.formContainer}>
      <h2>contact us</h2>
      <Form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.inputsDiv}>
          <div className={styles.leftFieldset}>
            <Input
              register={register}
              labelName={'First Name'}
              inputType={'text'}
              inputName={'firstName'}
              error={errors.firstName?.message}
              testId={'landing-input-first-name'}
            />
            <Input
              register={register}
              labelName={'Last Name'}
              inputType={'text'}
              inputName={'lastName'}
              error={errors.lastName?.message}
              testId={'landing-input-last-name'}
            />
          </div>
          <div className={styles.rightFieldset}>
            <Input
              register={register}
              labelName={'Email'}
              inputType={'text'}
              inputName={'email'}
              error={errors.email?.message}
              testId={'landing-input-email'}
            />
            <Input
              register={register}
              labelName={'Phone'}
              inputType={'number'}
              inputName={'phone'}
              error={errors.phone?.message}
              testId={'landing-input-phone'}
            />
          </div>
        </div>
        <div className={styles.buttonsDiv}>
          <Button
            text={'Send'}
            type={'submit'}
            info={'submit'}
            testId={'landing-button-submit-form'}
            disabled={Object.keys(errors).length !== 0}
          />
        </div>
      </Form>
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
