import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { updateTrainer, addTrainer } from 'Redux/trainers/thunks';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import trainerValidation from 'Validations/trainers';
import styles from './form.module.css';
import Button from 'Components/Shared/Button/index';
import Input from 'Components/Shared/Input';
import SharedForm from 'Components/Shared/Form';
import Container from 'Components/Shared/Container';
import toast, { Toaster } from 'react-hot-toast';

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
    resolver: joiResolver(trainerValidation)
  });

  useEffect(() => {
    if (id) {
      getTrainerById(id);
    }
  }, []);

  const getTrainerById = (id) => {
    const trainer = trainers.find((trainer) => trainer._id === id);
    if (trainer) {
      delete trainer._id;
      delete trainer.__v;
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
      const response = await dispatch(updateTrainer(data, id));
      localStorage.setItem('toastMessage', response.message);
      history.push('/admins/trainers');
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  const onSubmit = (data) => {
    if (id) {
      updateTrainerFunction(id, data);
    } else {
      createTrainer(data);
    }
  };

  const handleCancel = () => {
    history.push('/admins/trainers');
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
      <SharedForm onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.headContainer}>
          <h2>{id ? 'Update Trainer' : 'Add Trainer'}</h2>
        </div>
        <div className={styles.container}>
          <div>
            <Input
              register={register}
              labelName={'Name'}
              inputType={'text'}
              inputName={'firstName'}
              error={errors.firstName?.message}
              testId={'admin-trainers-input-first-name'}
            />
            <Input
              register={register}
              labelName={'Last Name'}
              inputType={'text'}
              inputName={'lastName'}
              error={errors.lastName?.message}
              testId={'admin-trainers-input-last-name'}
            />
            <Input
              register={register}
              labelName={'DNI'}
              inputType={'number'}
              inputName={'dni'}
              error={errors.dni?.message}
              testId={'admin-trainers-input-dni'}
            />
            <Input
              register={register}
              labelName={'Phone Number'}
              inputType={'number'}
              inputName={'phone'}
              error={errors.phone?.message}
              testId={'admin-trainers-input-phone'}
            />
          </div>
          <div>
            <Input
              register={register}
              labelName={'Email'}
              inputType={'text'}
              inputName={'email'}
              error={errors.email?.message}
              testId={'admin-trainers-input-email'}
            />
            <Input
              register={register}
              labelName={'City'}
              inputType={'text'}
              inputName={'city'}
              error={errors.city?.message}
              testId={'admin-trainers-input-city'}
            />
            <Input
              register={register}
              labelName={'Salary'}
              inputType={'number'}
              inputName={'salary'}
              error={errors.salary?.message}
              testId={'admin-trainers-input-salary'}
            />
            <Input
              register={register}
              labelName={'Password'}
              inputType={'text'}
              inputName={'password'}
              error={errors.password?.message}
              testId={'admin-trainers-input-password'}
            />
            <Input
              register={register}
              labelName={'Active ?'}
              inputType={'isActive'}
              inputName={'isActive'}
              error={errors.isActive}
              testId={'admin-trainers-input-checkbox'}
            />
          </div>
        </div>
        <div>
          <div className={styles.buttons}>
            <Button
              text={id ? 'Update' : 'Add'}
              type="submit"
              info={'submit'}
              testId={'admin-trainers-button-submit-form'}
            />

            <div className={styles.buttonsLow}>
              <Button
                text="Back"
                type="cancel"
                clickAction={handleCancel}
                testId={'admin-trainers-button-back-form'}
              />
              <Button
                type={'cancel'}
                clickAction={handleReset}
                text={'Reset'}
                info={'reset'}
                testId={'admin-trainers-button-reset-form'}
              />
            </div>
          </div>
        </div>
      </SharedForm>
    </Container>
  );
};

export default AdminTrainerForm;
