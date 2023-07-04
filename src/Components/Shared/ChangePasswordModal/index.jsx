import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import styles from '../ChangePasswordModal/';
import Button from 'Components/Shared/Button';
import Input from 'Components/Shared/Input';
import { updateSuperAdmin } from 'Redux/superadmins/thunks';

const ChangePasswordModal = ({ show, closeModal }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver,
    defaultValues: {
      password: '',
      repeatPassword: ''
    }
  });

  const handleFormSubmit = (data) => {
    dispatch(updateSuperAdmin(data.password));
    closeModal();
  };

  if (!show) {
    return null;
  }

  return (
    <div className={`${styles.modalContainer} modal-container`}>
      <div className={`${styles.modalContentDefault} modal-content`}>
        <h3 className={`${styles.h3Container} h3-container`}>Change Password</h3>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className={`${styles.inputContainer} input-container`}>
            <Input
              register={register}
              labelName={'Password'}
              inputType={'password'}
              inputName={'password'}
              error={errors.password?.message}
            />
          </div>
          <div className={`${styles.inputContainer} input-container`}>
            <Input
              register={register}
              labelName={'Repeat Password'}
              inputType={'password'}
              inputName={'repeatPassword'}
              error={errors.repeatPassword?.message}
            />
          </div>
          <div className={`${styles.buttonContainer} button-container`}>
            <Button type="cancel" text={'Cancel'} clickAction={closeModal} />
            <Button type="submit" text={'Confirm'} />
          </div>
        </form>
      </div>
    </div>
  );
};
export default ChangePasswordModal;
