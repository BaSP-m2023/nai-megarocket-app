import React, { useState, useEffect } from 'react';
import { putAdmin, getAdminById } from 'Redux/admins/thunks';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import adminsValidation from 'Validations/admins';
import styles from './profile.module.css';
import Button from 'Components/Shared/Button';
import SharedModal from 'Components/Shared/Modal';
import Input from 'Components/Shared/Input';
import { FaRegEye, FaEyeSlash } from 'react-icons/fa';
import Container from 'Components/Shared/Container';

const AdminProfile = () => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const id = '648dbbd7413c4e8c07551b9e';

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
      fetchAdminById(id);
    }
  }, []);

  const fetchAdminById = async (id) => {
    try {
      const response = await dispatch(getAdminById(id));
      const admin = response.data;
      delete admin._id;
      delete admin.__v;
      delete admin.createdAt;
      delete admin.updatedAt;
      reset(admin);
    } catch (error) {
      console.error('Member not found');
    }
  };

  const onSubmit = async (data) => {
    putAdminFunction(id, data);
    reset(data);
  };

  const putAdminFunction = async (id, admin) => {
    try {
      await dispatch(putAdmin(id, admin));
      setAlertMessage('Saved changes');
      setIsSuccess(true);
      setShowAlert(true);
      handleDisableEditMode();
    } catch (error) {
      setAlertMessage(error.message);
      setIsSuccess(false);
      setShowAlert(true);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
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
      <div className={styles.formContainer}>
        <h2 className={styles.formTitleTwo}>admin data</h2>

        <form className={styles.formAdmin} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.firstInputs}>
            <div className={styles.formInput}>
              <Input
                register={register}
                labelName={'Name'}
                inputType={'text'}
                inputName={'firstName'}
                error={errors.firstName?.message}
                disabled={!editMode}
              />
            </div>
            <div className={styles.formInput}>
              <Input
                register={register}
                labelName={'Last Name'}
                inputType={'text'}
                inputName={'lastName'}
                error={errors.lastName?.message}
                disabled={!editMode}
              />
            </div>
            <div className={styles.formInput}>
              <Input
                register={register}
                labelName={'DNI'}
                inputType={'number'}
                inputName={'dni'}
                error={errors.dni?.message}
                disabled={!editMode}
              />
            </div>
            <div className={styles.formInput}>
              <Input
                register={register}
                labelName={'Phone Number'}
                inputType={'number'}
                inputName={'phone'}
                error={errors.phone?.message}
                disabled={!editMode}
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
                disabled={!editMode}
              />
            </div>
            <div className={styles.formInput}>
              <Input
                register={register}
                labelName={'City'}
                inputType={'text'}
                inputName={'city'}
                error={errors.city?.message}
                disabled={!editMode}
              />
            </div>
            <div className={styles.formInput} style={{ display: 'flex', gap: '10px' }}>
              <Input
                register={register}
                labelName={'Password'}
                inputType={showPassword ? 'text' : 'password'}
                inputName={'password'}
                error={errors.password?.message}
                disabled={!editMode}
              />
              <button
                className={styles.toggleButton}
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaRegEye />}
              </button>
            </div>
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
                  <Button text={'Cancel'} type={'cancel'} clickAction={handleDisableEditMode} />
                  <Button text={'Confirm'} type={'submit'} info={'submit'} />
                </div>
              </>
            )}
          </div>
          <SharedModal
            isDelete={false}
            show={showAlert}
            closeModal={handleCloseAlert}
            typeStyle={isSuccess ? 'success' : 'error'}
            title={isSuccess ? 'Success' : 'Something went wrong'}
            body={alertMessage}
          />
        </form>
      </div>
    </Container>
  );
};

export default AdminProfile;
