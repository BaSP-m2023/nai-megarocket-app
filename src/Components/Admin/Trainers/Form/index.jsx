import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { updateTrainer, addTrainer } from 'Redux/trainers/thunks';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { trainerCreateValidation, trainerUpdateValidation } from 'Validations/trainers';
import styles from './form.module.css';
import Button from 'Components/Shared/Button/index';
import Input from 'Components/Shared/Input';
import SharedForm from 'Components/Shared/Form';
import Container from 'Components/Shared/Container';
import toast, { Toaster } from 'react-hot-toast';
import { FiArrowLeft } from 'react-icons/fi';

const AdminTrainerForm = () => {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const trainers = useSelector((state) => state.trainers.data);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'all',
    resolver: joiResolver(id ? trainerUpdateValidation : trainerCreateValidation)
  });

  useEffect(() => {
    toast.remove();
    if (id) {
      getTrainerById(id);
    }
  }, []);

  const getTrainerById = (id) => {
    const trainer = trainers.find((trainer) => trainer._id === id);
    if (trainer) {
      delete trainer._id;
      delete trainer.__v;
      delete trainer.firebaseUid;
      delete trainer.createdAt;
      delete trainer.updatedAt;
      reset(trainer);
    }
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

  const createTrainer = async (data) => {
    try {
      const response = await dispatch(addTrainer(data));
      localStorage.setItem('toastMessage', response.message);
      history.push('/admins/trainers');
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  const updateTrainerFunction = async (id, data) => {
    try {
      const response = await dispatch(updateTrainer(id, data));
      localStorage.setItem('toastMessage', response.message);
      history.push('/admins/trainers');
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  const onSubmit = (data) => {
    if (id) {
      updateTrainerFunction(id, data);
      delete data.password;
    } else {
      createTrainer(data);
    }
  };

  const handleCancel = () => {
    history.push('/admins/trainers');
  };

  return (
    <Container>
      <Toaster
        containerStyle={{
          margin: '10vh 0 0 0'
        }}
      />
      <SharedForm onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.head}>
          {' '}
          <div id="admin-arrow-back" className={styles.arrow} onClick={handleCancel}>
            <FiArrowLeft size={35} />
          </div>
          <h2 className={styles.formTitle}> {id ? 'Update Trainer' : 'Add Trainer'}</h2>
        </div>
        <div className={styles.container}>
          <div>
            <Input
              register={register}
              labelName={'Name'}
              inputType={'text'}
              inputName={'firstName'}
              error={errors.firstName?.message}
              testId={'admin-input-first-name'}
            />
            <Input
              register={register}
              labelName={'Last Name'}
              inputType={'text'}
              inputName={'lastName'}
              error={errors.lastName?.message}
              testId={'admin-input-last-name'}
            />
            <Input
              register={register}
              labelName={'DNI'}
              inputType={'number'}
              inputName={'dni'}
              error={errors.dni?.message}
              testId={'admin-input-dni'}
            />
            <Input
              register={register}
              labelName={'Phone Number'}
              inputType={'number'}
              inputName={'phone'}
              error={errors.phone?.message}
              testId={'admin-input-phone'}
            />
          </div>
          <div>
            <Input
              register={register}
              labelName={'Email'}
              inputType={'text'}
              inputName={'email'}
              error={errors.email?.message}
              testId={'admin-input-email'}
            />
            <Input
              register={register}
              labelName={'City'}
              inputType={'text'}
              inputName={'city'}
              error={errors.city?.message}
              testId={'admin-input-city'}
            />
            <Input
              register={register}
              labelName={'Salary'}
              inputType={'number'}
              inputName={'salary'}
              error={errors.salary?.message}
              testId={'admin-input-salary'}
            />
            {!id && (
              <Input
                register={register}
                labelName={'Password'}
                inputType={'text'}
                inputName={'password'}
                error={errors.password?.message}
                testId={'admin-input-password'}
              />
            )}
            {id && (
              <div className={styles.active}>
                {' '}
                <Input
                  register={register}
                  labelName={'Active ?'}
                  inputType={'isActive'}
                  inputName={'isActive'}
                  error={errors.isActive}
                  testId={'admin-input-checkbox'}
                />
              </div>
            )}
          </div>
        </div>

        <div className={styles.buttons}>
          <Button
            text={id ? 'Update' : 'Add'}
            type="submit"
            info={'submit'}
            testId={'admin-button-submit-form'}
          />
        </div>
      </SharedForm>
    </Container>
  );
};

export default AdminTrainerForm;
