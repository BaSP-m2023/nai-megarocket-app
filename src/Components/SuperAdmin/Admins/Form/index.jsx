import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { putAdmin, postAdmin } from 'Redux/admins/thunks';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import adminsValidation from 'Validations/admins';
import styles from './form.module.css';
import Button from 'Components/Shared/Button';
import Input from 'Components/Shared/Input';
import Container from 'Components/Shared/Container';
import { toast, Toaster } from 'react-hot-toast';

const Form = () => {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const admins = useSelector((state) => state.admins.data);

  const [showAlert, setShowAlert] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'all',
    resolver: joiResolver(adminsValidation)
  });

  useEffect(() => {
    if (id) {
      getAdminById(id);
    }
  }, []);

  const getAdminById = (id) => {
    const admin = admins.find((admin) => admin._id === id);
    if (admin) {
      delete admin._id;
      delete admin.__v;
      delete admin.createdAt;
      delete admin.updatedAt;
      reset(admin);
    } else {
      console.error('Admin not found');
    }
  };

  const onSubmit = async (data) => {
    if (id) {
      putAdminFunction(id, data);
    } else {
      postAdminFunction(data);
    }
  };

  const showErrorToast = (message) => {
    toast.error(message, {
      duration: 2500,
      position: 'bottom-left',
      style: {
        background: 'rgba(227, 23, 10, 0.5)'
      },
      iconTheme: {
        primary: '#0f232e',
        secondary: '#fff'
      }
    });
  };

  const postAdminFunction = async (admin) => {
    try {
      const data = await dispatch(postAdmin(admin));
      localStorage.setItem('toastMessage', data.message);
      history.push('/super-admin/admins');
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  const putAdminFunction = async (id, admin) => {
    try {
      const data = await dispatch(putAdmin(id, admin));
      localStorage.setItem('toastMessage', data.message);
      history.push('/super-admin/admins');
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  const handleCancel = () => {
    if (showAlert) {
      setShowAlert(false);
    }
    setShowAlert(false);
    history.push('/super-admin/admins');
  };
  const handleReset = () => {
    reset();
  };

  return (
    <Container>
      <Toaster
        containerStyle={{
          margin: '0 0 0 15vw'
        }}
      />
      <div className={styles.formContainer}>
        <h2 className={styles.formTitle}>{id ? 'Update Admin' : 'Add Admin'}</h2>
        <form className={styles.formAdmin} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.firstInputs}>
            <div className={styles.formInput}>
              <Input
                register={register}
                labelName={'Name'}
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
            <div className={styles.formInput}>
              <Input
                register={register}
                labelName={'Password'}
                inputType={'text'}
                inputName={'password'}
                error={errors.password?.message}
              />
            </div>
          </div>
          <div className={styles.buttonsDiv}>
            <Button text={id ? 'Update' : 'Add'} type="submit" info={'submit'} />
            <div className={styles.buttonsAdmin}>
              <Button text="Back" type="cancel" clickAction={handleCancel} />
              <Button type={'cancel'} clickAction={handleReset} info={'reset'} text={'Reset'} />
            </div>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default Form;
