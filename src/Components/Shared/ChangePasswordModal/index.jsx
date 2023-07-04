import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { joiResolver } from '@hookform/resolvers/joi';
import styles from './modal.module.css';
import Button from 'Components/Shared/Button';
import Input from 'Components/Shared/Input';
import ValidationsPassword from '../../../Validations/validations-password';
import { putAdmin, getAdminById } from 'Redux/admins/thunks';

const ChangePasswordModal = ({ show, closeModal }) => {
  if (!show) {
    return null;
  }

  const dispatch = useDispatch();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(ValidationsPassword),
    defaultValues: {
      password: '',
      repeatPassword: ''
    }
  });

  useEffect(() => {
    if (id) {
      getAdminById(id);
    }
  }, []);

  const handleFormSubmit = async (formData) => {
    try {
      await dispatch(putAdmin(id, { password: formData.password }));
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={styles.modalOverlay}>
        <div className={styles.modalContainer}>
          <h3>Change Password</h3>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className={styles.inputContainer}>
              <Input
                register={register}
                labelName={'Password'}
                inputType={'password'}
                inputName={'password'}
                error={errors.password?.message}
              />
            </div>
            <div className={styles.inputContainer}>
              <Input
                register={register}
                labelName={'Repeat Password'}
                inputType={'password'}
                inputName={'repeatPassword'}
                error={errors.repeatPassword?.message}
              />
            </div>
            <div className={styles.buttonContainer}>
              <Button type="cancel" text={'Cancel'} clickAction={closeModal} />
              <Button type="submit" text={'Confirm'} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePasswordModal;
