import React, { useState, useEffect } from 'react';
import { putAdmin } from 'Redux/admins/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import adminsValidation from 'Validations/admins';
import styles from './profile.module.css';
import Button from 'Components/Shared/Button';
import Input from 'Components/Shared/Input';
import Container from 'Components/Shared/Container';
import toast, { Toaster } from 'react-hot-toast';
import { updateUser } from 'Redux/auth/actions';

const AdminProfile = () => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const admin = useSelector((state) => state.auth?.user);
  const id = admin?._id;

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(adminsValidation)
  });

  useEffect(() => {
    toast.remove();
    loadAdminData();
  }, [id]);

  const loadAdminData = () => {
    const adminToUpdate = {
      ...admin
    };
    delete adminToUpdate._id;
    delete adminToUpdate.__v;
    delete adminToUpdate.createdAt;
    delete adminToUpdate.updatedAt;
    delete adminToUpdate.firebaseUid;
    reset(adminToUpdate);
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
    putAdminFunction(id, data);
    reset(data);
  };

  const putAdminFunction = async (id, admin) => {
    try {
      const response = await dispatch(putAdmin(id, admin));
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
        <h2 className={styles.formTitleTwo}>
          {editMode
            ? `${admin?.firstName} ${admin?.lastName} Profile`
            : `${admin?.firstName} ${admin?.lastName} Profile`}
        </h2>

        <form className={styles.formMembers} onSubmit={handleSubmit(onSubmit)}>
          <div className={`${styles.formColumn} ${styles.formLeft}`}>
            <Input
              register={register}
              labelName={'First Name'}
              inputType={'text'}
              inputName={'firstName'}
              error={errors.firstName?.message}
              disabled={!editMode}
              testId={'admin-profile-input-first-name'}
            />
            <Input
              register={register}
              labelName={'Last Name'}
              inputType={'text'}
              inputName={'lastName'}
              error={errors.lastName?.message}
              disabled={!editMode}
              testId={'admin-profile-input-last-name'}
            />
            <Input
              register={register}
              labelName={'DNI'}
              inputType={'text'}
              inputName={'dni'}
              error={errors.dni?.message}
              disabled={true}
              testId={'admin-profile-input-dni'}
            />
          </div>
          <div className={`${styles.formColumn} ${styles.formRight}`}>
            <Input
              register={register}
              labelName={'Email'}
              inputType={'text'}
              inputName={'email'}
              error={errors.email?.message}
              disabled={!editMode}
              testId={'admin-profile-input-email'}
            />
            <Input
              register={register}
              labelName={'City'}
              inputType={'text'}
              inputName={'city'}
              error={errors.city?.message}
              disabled={!editMode}
              testId={'admin-profile-input-city'}
            />
            <Input
              register={register}
              labelName={'Phone Number'}
              inputType={'text'}
              inputName={'phone'}
              error={errors.phone?.message}
              disabled={!editMode}
              testId={'admin-profile-input-phone'}
            />
          </div>
          <div className={styles.buttonContainer}>
            {!editMode && (
              <Button
                className={styles.editButton}
                text={'Edit'}
                type={'submit'}
                clickAction={handleEnableEditMode}
                testId={'admin-profile-edit-button'}
              />
            )}
            {editMode && (
              <>
                <div className={styles.buttonsLowContainer}>
                  <Button
                    text={'Cancel'}
                    type={'cancel'}
                    clickAction={handleDisableEditMode}
                    testId={'admin-profile-cancel-button'}
                  />
                  <Button
                    text={'Confirm'}
                    type={'submit'}
                    info={'submit'}
                    testId={'admin-profile-submit-button'}
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

export default AdminProfile;
