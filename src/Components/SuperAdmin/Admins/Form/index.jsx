import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { putAdmin } from 'Redux/admins/thunks';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import adminsValidation from 'Validations/admins';
import styles from './form.module.css';
import Button from 'Components/Shared/Button';
import Input from 'Components/Shared/Input';
import Container from 'Components/Shared/Container';
import { toast, Toaster } from 'react-hot-toast';

import ChangePasswordModal from 'Components/Shared/ChangePasswordModal';

const Form = () => {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const admins = useSelector((state) => state.admins.data);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(adminsValidation),
    defaultValues: {
      firstName: '',
      lastName: '',
      dni: '',
      phone: '',
      email: '',
      city: '',
      password: ''
    }
  });

  useEffect(() => {
    if (id) {
      getAdminById(id);
    }
  }, []);

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const getAdminById = (id) => {
    const admin = admins.find((admin) => admin._id === id);
    if (admin) {
      delete admin._id;
      delete admin.__v;
      delete admin.createdAt;
      delete admin.updatedAt;
      delete admin.firebaseUid;
      reset(admin);
    } else {
      console.error('Admin not found');
    }
  };

  const onSubmit = async (data) => {
    putAdminFunction(id, data);
  };

  const showErrorToast = (message) => {
    toast.error(message, {
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
  };

  const putAdminFunction = async (id, admin) => {
    try {
      const data = await dispatch(putAdmin(id, admin));
      localStorage.setItem('toastMessage', data.message);
      history.push('/super-admins/admins');
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  const handleBack = () => {
    history.push('/super-admins/admins');
  };

  const handleReset = () => {
    reset();
  };

  return (
    <Container>
      <Toaster
        containerStyle={{
          margin: '10vh 0 0 0'
        }}
      />
      <div className={styles.formContainer}>
        <h2 className={styles.formTitle}>{id ? 'Update Admin' : 'Add Admin'}</h2>
        <form className={styles.formAdmin} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.firstInputs}>
            <div className={styles.formInput}>
              <Input
                register={register}
                labelName={'First Name'}
                inputType={'text'}
                inputName={'firstName'}
                error={errors.firstName?.message}
              />
            </div>
            <div className={styles.formInput}>
              <Input
                register={register}
                labelName={'Last Name'}
                inputType={'text'}
                inputName={'lastName'}
                error={errors.lastName?.message}
              />
            </div>
            <div className={styles.formInput}>
              <Input
                register={register}
                labelName={'DNI'}
                inputType={'number'}
                inputName={'dni'}
                error={errors.dni?.message}
              />
            </div>
            <div className={styles.formInput}>
              <Input
                register={register}
                labelName={'Phone Number'}
                inputType={'number'}
                inputName={'phone'}
                error={errors.phone?.message}
              />
            </div>
          </div>
          <div className={styles.secondInputs}>
            <div className={styles.formInput}>
              <Input
                register={register}
                labelName={'Email'}
                inputType={'text'}
                inputName={'email'}
                error={errors.email?.message}
              />
            </div>
            <div className={styles.formInput}>
              <Input
                register={register}
                labelName={'City'}
                inputType={'text'}
                inputName={'city'}
                error={errors.city?.message}
              />
            </div>
            {!id && (
              <div className={styles.formInput}>
                <Input
                  register={register}
                  labelName={'Password'}
                  inputType={'password'}
                  inputName={'password'}
                  error={errors.password?.message}
                />
              </div>
            )}
          </div>
          <div className={styles.buttonsDiv}>
            <Button text={id ? 'Update' : 'Add'} type="submit" info={'submit'} />
            <div className={styles.buttonsAdmin}>
              <Button text="Back" type="cancel" clickAction={handleBack} />
              <Button type={'cancel'} clickAction={handleReset} info={'reset'} text={'Reset'} />
              {id && (
                <button type="button" className="changePasswordButton" onClick={openModal}>
                  Change Password
                </button>
              )}
            </div>
          </div>
        </form>
        <ChangePasswordModal show={isModalOpen} closeModal={closeModal} />
      </div>
    </Container>
  );
};

export default Form;
