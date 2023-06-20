import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateMember, getMembersById } from 'Redux/members/thunks';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import styles from './profile.module.css';
import SharedModal from 'Components/Shared/Modal';
import Button from 'Components/Shared/Button';
import Input from 'Components/Shared/Input/index';
import memberValidation from 'Validations/members';
import { FaRegEye, FaEyeSlash } from 'react-icons/fa';

const MemberForm = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const membership = ['Black', 'Gold', 'Silver'];
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(memberValidation)
  });
  const id = '648e3c83b5cfaed572813eae';

  useEffect(() => {
    if (id) {
      fetchMemberById(id);
    }
  }, []);

  const fetchMemberById = async (id) => {
    try {
      const response = await dispatch(getMembersById(id));
      const member = response.data;
      const formattedMember = {
        ...member,
        birthDay: formatDate(member.birthDay)
      };
      delete formattedMember._id;
      delete formattedMember.__v;
      reset(formattedMember);
    } catch (error) {
      console.error('Member not found');
    }
  };

  const onSubmit = (data) => {
    memberUpdateFunction(id, data);
  };

  const memberUpdateFunction = async (id, member) => {
    try {
      await dispatch(updateMember(id, member));
      setAlertMessage('Saved changes');
      setIsSuccess(true);
      setShowAlert(true);
      handleDisableEditMode();
      fetchMemberById(id);
    } catch (error) {
      setAlertMessage(error.message);
      setIsSuccess(false);
      setShowAlert(true);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
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

  const handleEnableEditMode = () => {
    setEditMode(true);
  };

  const handleDisableEditMode = () => {
    setEditMode(false);
    reset();
  };

  return (
    <>
      <div className={styles.formContainer}>
        <h2 className={styles.formTitleTwo}>user data</h2>
        <SharedModal
          isDelete={false}
          show={showAlert}
          closeModal={handleCloseAlert}
          typeStyle={isSuccess ? 'success' : 'error'}
          title={isSuccess ? 'Success' : 'Something went wrong'}
          body={alertMessage}
        />
        <form className={styles.formMembers} onSubmit={handleSubmit(onSubmit)}>
          <div className={`${styles.formColumn} ${styles.formLeft}`}>
            <Input
              register={register}
              labelName={'First Name'}
              inputType={'text'}
              inputName={'firstName'}
              error={errors.firstName?.message}
              disabled={!editMode}
            />
            <Input
              register={register}
              labelName={'Last Name'}
              inputType={'text'}
              inputName={'lastName'}
              error={errors.lastName?.message}
              disabled={!editMode}
            />
            <Input
              register={register}
              labelName={'DNI'}
              inputType={'number'}
              inputName={'dni'}
              error={errors.dni?.message}
              disabled={!editMode}
            />
            <Input
              register={register}
              labelName={'Phone'}
              inputType={'number'}
              inputName={'phone'}
              error={errors.phone?.message}
              disabled={!editMode}
            />
            <Input
              register={register}
              labelName={'Email'}
              inputType={'text'}
              inputName={'email'}
              error={errors.email?.message}
              disabled={!editMode}
            />
          </div>
          <div className={`${styles.formColumn} ${styles.formRight}`}>
            <div style={{ display: 'flex', gap: '10px' }}>
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

            <Input
              register={register}
              labelName={'City'}
              inputType={'text'}
              inputName={'city'}
              error={errors.city?.message}
              disabled={!editMode}
            />

            <Input
              register={register}
              labelName={'Date of birth'}
              inputType={'date'}
              inputName={'birthDay'}
              error={errors.birthDay?.message}
              disabled={!editMode}
            />

            <Input
              register={register}
              labelName={'Postal Code'}
              inputType={'number'}
              inputName={'postalCode'}
              error={errors.postalCode?.message}
              disabled={!editMode}
            />

            <Input
              register={register}
              labelName={'Memberships'}
              inputType={'text'}
              list={membership}
              inputName={'membership'}
              error={errors.membership?.message}
              disabled={true}
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
                  <Button text={'Cancel'} type={'cancel'} clickAction={handleDisableEditMode} />
                  <Button text={'Confirm'} type={'submit'} info={'submit'} />
                </div>
              </>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default MemberForm;
