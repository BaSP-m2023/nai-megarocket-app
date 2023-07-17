import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { joiResolver } from '@hookform/resolvers/joi';
import styles from './modal.module.css';
import Button from 'Components/Shared/Button';
import Input from 'Components/Shared/Input';
import ValidationsPassword from '../../../../../Validations/Auth/validations-password';
import { putAdmin, getAdminById } from 'Redux/admins/thunks';
import { toast } from 'react-hot-toast';
import { FaRegEye, FaEyeSlash } from 'react-icons/fa';

const ChangePasswordModal = ({ show, closeModal }) => {
  if (!show) {
    return null;
  }

  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(ValidationsPassword),
    defaultValues: {
      password: '',
      repeatPassword: ''
    }
  });

  const password = watch('password');
  const repeatPassword = watch('repeatPassword');

  const showToast = (message, type) => {
    const toastConfig = {
      duration: 2500,
      position: 'top-right',
      style: {
        background: type === 'success' ? '#fddba1' : 'rgba(227, 23, 10, 0.5)'
      },
      iconTheme: {
        primary: '#0f232e',
        secondary: '#fff'
      }
    };
    if (type === 'success') {
      toast.success(message, toastConfig);
    } else if (type === 'error') {
      toast.error(message, toastConfig);
    }
  };

  useEffect(() => {
    if (id) {
      getAdminById(id);
    }
  }, []);

  const handleFormSubmit = async (formData) => {
    if (password !== repeatPassword) {
      setError('repeatPassword', {
        type: 'manual',
        message: 'Passwords do not match'
      });
      return;
    }

    try {
      await dispatch(putAdmin(id, { password: formData.password }));
      showToast('Password was succesfully updated', 'success');
      closeModal();
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  return (
    <>
      <div className={styles.modalOverlay}>
        <div className={styles.modalContainer}>
          <h3>Change Password</h3>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className={styles.buttonContainer}>
              <button
                id="eye-button"
                className={styles.eyeButton}
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaRegEye />}
              </button>
            </div>
            <div className={styles.inputContainer}>
              <Input
                register={register}
                labelName={'Password'}
                inputType={showPassword ? 'text' : 'password'}
                inputName={'password'}
                error={errors.password?.message}
                testId={'super-admin-input-password-change'}
                errorTestId={'super-admin-input-password-change-error'}
              />
            </div>
            <div className={styles.inputContainer}>
              <Input
                register={register}
                labelName={'Repeat Password'}
                inputType={showPassword ? 'text' : 'password'}
                inputName={'repeatPassword'}
                error={errors.repeatPassword?.message}
                testId={'super-admin-input-repeat-password-change'}
                errorTestId={'super-admin-input-repeat-password-change-error'}
              />
            </div>
            <div className={styles.buttonContainer}>
              <Button
                type="cancel"
                text={'Cancel'}
                testId={'button-back-super-admin-admin-password-modal'}
                clickAction={closeModal}
              />
              <Button
                type="submit"
                testId={'button-super-admin-admins-confirm-change-password'}
                text={'Confirm'}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePasswordModal;
