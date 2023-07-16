import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateMember } from 'Redux/members/thunks';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import styles from './profile.module.css';
import Button from 'Components/Shared/Button';
import Input from 'Components/Shared/Input/index';
import memberValidation from 'Validations/members';
import Container from 'Components/Shared/Container';
import toast, { Toaster } from 'react-hot-toast';
import { updateUser } from 'Redux/auth/actions';

const MemberForm = () => {
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const membership = ['Only Classes', 'Classic', 'Black'];
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(memberValidation)
  });
  const user = useSelector((state) => state.auth?.user);
  const id = user?._id;

  const loadMemberData = () => {
    const formattedMember = {
      ...user,
      birthDay: formatDate(user?.birthDay)
    };
    delete formattedMember?._id;
    delete formattedMember?.__v;
    delete formattedMember?.firebaseUid;
    delete formattedMember?.createdAt;
    delete formattedMember?.updatedAt;
    reset(formattedMember);
  };

  useEffect(() => {
    toast.remove();
    if (id) {
      loadMemberData();
    }
  }, [id]);

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

  const formatDate = (dateString) => {
    const parts = dateString.split('-');
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1;
    const day = parseInt(parts[2]);
    const date = new Date(year, month, day);

    const formattedYear = date.getFullYear();
    const formattedMonth = (date.getMonth() + 1).toString().padStart(2, '0');
    const formattedDay = date.getDate().toString().padStart(2, '0');

    return `${formattedYear}-${formattedMonth}-${formattedDay}`;
  };

  const updateLoggedMember = async (id, member) => {
    try {
      const data = await dispatch(updateMember(id, member));
      dispatch(updateUser(data.data));
      const formatedData = {
        ...data.data,
        birthDay: formatDate(data?.data?.birthDay)
      };
      delete formatedData?._id;
      delete formatedData?.__v;
      delete formatedData?.firebaseUid;
      reset(formatedData);
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

  const onSubmit = (data) => {
    updateLoggedMember(id, data);
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
            ? `${user?.firstName} ${user?.lastName} Profile`
            : `${user?.firstName} ${user?.lastName} Profile`}
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
              testId={'member-input-first-name'}
            />
            <Input
              register={register}
              labelName={'Last Name'}
              inputType={'text'}
              inputName={'lastName'}
              error={errors.lastName?.message}
              disabled={!editMode}
              testId={'member-input-last-name'}
            />

            <Input
              register={register}
              labelName={'Phone'}
              inputType={'number'}
              inputName={'phone'}
              error={errors.phone?.message}
              disabled={!editMode}
              testId={'member-input-phone'}
            />
            <Input
              register={register}
              labelName={'Email'}
              inputType={'text'}
              inputName={'email'}
              error={errors.email?.message}
              disabled={!editMode}
              testId={'member-input-email'}
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
              testId={'member-input-city'}
            />
            <Input
              register={register}
              labelName={'Date of birth'}
              inputType={'date'}
              inputName={'birthDay'}
              error={errors.birthDay?.message}
              disabled={!editMode}
              testId={'member-input-date'}
            />
            <Input
              register={register}
              labelName={'Postal Code'}
              inputType={'number'}
              inputName={'postalCode'}
              error={errors.postalCode?.message}
              disabled={!editMode}
              testId={'member-input-postal-code'}
            />
            <Input
              register={register}
              labelName={'Membership'}
              inputType={'text'}
              list={membership}
              inputName={'membership'}
              error={errors.membership?.message}
              disabled={true}
              testId={'member-input-membership'}
            />
          </div>
          <div className={styles.buttonContainer}>
            {!editMode && (
              <Button
                className={styles.editButton}
                text={'Edit'}
                type={'submit'}
                clickAction={handleEnableEditMode}
                testId={'member-edit-button'}
              />
            )}
            {editMode && (
              <>
                <div className={styles.buttonsLowContainer}>
                  <Button
                    testId={'member-cancel-button'}
                    text={'Cancel'}
                    type={'cancel'}
                    clickAction={handleDisableEditMode}
                  />
                  <Button
                    testId={'member-submit-button'}
                    text={'Confirm'}
                    type={'submit'}
                    info={'submit'}
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

export default MemberForm;
