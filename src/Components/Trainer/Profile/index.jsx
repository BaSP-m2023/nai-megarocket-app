import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import trainerValidation from 'Validations/trainers';
import styles from './profile.module.css';
import Button from 'Components/Shared/Button';
import Input from 'Components/Shared/Input/index';
import Container from 'Components/Shared/Container';
import toast, { Toaster } from 'react-hot-toast';
import { updateUser } from 'Redux/auth/actions';
import { updateTrainer } from 'Redux/trainers/thunks';

const TrainerForm = () => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const trainer = useSelector((state) => state.auth?.user);
  const id = trainer?._id;

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(trainerValidation)
  });

  useEffect(() => {
    loadAdminData();
  }, [id]);

  const loadAdminData = () => {
    const trainerToUpdate = {
      ...trainer
    };
    delete trainerToUpdate._id;
    delete trainerToUpdate.__v;
    delete trainerToUpdate.createdAt;
    delete trainerToUpdate.updatedAt;
    delete trainerToUpdate.firebaseUid;
    reset(trainerToUpdate);
  };

  const showToast = (message, type) => {
    if (type === 'success') {
      toast.success(message, {
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
    }
  };

  const onSubmit = async (data) => {
    updateTrainerFunction(id, data);
    reset(data);
  };

  const updateTrainerFunction = async (id, admin) => {
    try {
      const response = await dispatch(updateTrainer(id, admin));
      dispatch(updateUser(response.data));
      showToast('Saved Changes', 'success');
      handleDisableEditMode();
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  const handleEnableEditMode = () => {
    setEditMode(true);
  };

  const handleDisableEditMode = () => {
    setEditMode(false);
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
        <h2 className={styles.formTitleTwo}>trainer data</h2>
        <form className={styles.formTrainer} onSubmit={handleSubmit(onSubmit)}>
          <div className={`${styles.formColumn} ${styles.formLeft}`}>
            <Input
              register={register}
              labelName={'Name'}
              inputType={'text'}
              inputName={'firstName'}
              error={errors.firstName?.message}
              disabled={!editMode}
              testId={'trainers-input-first-name'}
            />
            <Input
              register={register}
              labelName={'Last Name'}
              inputType={'text'}
              inputName={'lastName'}
              error={errors.lastName?.message}
              disabled={!editMode}
              testId={'trainers-input-last-name'}
            />
            <Input
              register={register}
              labelName={'DNI'}
              inputType={'number'}
              inputName={'dni'}
              error={errors.dni?.message}
              disabled={!editMode}
              testId={'trainers-input-dni'}
            />
            <Input
              register={register}
              labelName={'Phone'}
              inputType={'number'}
              inputName={'phone'}
              error={errors.phone?.message}
              disabled={!editMode}
              testId={'trainers-input-phone'}
            />
          </div>
          <div className={`${styles.formColumn} ${styles.formRight}`}>
            <Input
              register={register}
              labelName={'City'}
              inputType={'text'}
              inputName={'city'}
              error={errors.city?.message}
              disabled={!editMode}
              testId={'trainers-input-city'}
            />
            <Input
              register={register}
              labelName={'Salary'}
              inputType={'number'}
              inputName={'salary'}
              error={errors.salary?.message}
              disabled={!editMode}
              testId={'trainers-input-salary'}
            />
            <Input
              register={register}
              labelName={'Email'}
              inputType={'text'}
              inputName={'email'}
              error={errors.email?.message}
              disabled={!editMode}
              testId={'trainers-input-email'}
            />
          </div>
          <div className={styles.buttonContainer}>
            {!editMode && (
              <Button
                className={styles.editButton}
                text={'Edit'}
                type={'submit'}
                clickAction={handleEnableEditMode}
              />
            )}
            {editMode && (
              <>
                <div className={styles.buttonsLowContainer}>
                  <Button
                    text={'Cancel'}
                    type={'cancel'}
                    clickAction={handleDisableEditMode}
                    testId={'trainers-button-cancel-form'}
                  />
                  <Button
                    text={'Confirm'}
                    type={'submit'}
                    info={'submit'}
                    testId={'trainers-button-submit-form'}
                  />
                </div>
              </>
            )}
          </div>
        </form>
      </div>
    </Container>
  );
};

export default TrainerForm;
