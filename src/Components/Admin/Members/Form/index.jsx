import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateMember, addMember } from 'Redux/members/thunks';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import styles from './form.module.css';
import SharedModal from 'Components/Shared/Modal';
import Button from 'Components/Shared/Button';
import Input from 'Components/Shared/Input';
import memberValidation from 'Validations/members';
import Container from 'Components/Shared/Container';

const MemberForm = () => {
  const members = useSelector((state) => state.members.data.data);
  const [showAlert, setShowAlert] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const membership = ['Only Classes', 'Classic', 'Black'];
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'all',
    resolver: joiResolver(memberValidation)
  });

  useEffect(() => {
    if (id) {
      memberById(id);
    }
  }, []);

  const memberById = (id) => {
    const member = members.find((member) => member._id === id);
    if (member) {
      member.birthDay = formatDate(member.birthDay);
      delete member._id;
      delete member.__v;
      reset(member);
    } else {
      console.error('Member not found');
    }
  };

  const onSubmit = (data) => {
    if (id) {
      memberUpdateFunction(id, data);
    } else {
      memberAddFunction(data);
    }
  };

  const memberUpdateFunction = async (id, member) => {
    try {
      const data = await dispatch(updateMember(id, member));
      setAlertMessage(data.message);
      setIsSuccess(true);
      setShowAlert(true);
    } catch (error) {
      setAlertMessage(error.message);
      setIsSuccess(false);
      setShowAlert(true);
    }
  };

  const memberAddFunction = async (member) => {
    try {
      const data = await dispatch(addMember(member));
      setAlertMessage(data.message);
      setIsSuccess(true);
      setShowAlert(true);
    } catch (error) {
      setAlertMessage(error.message);
      setIsSuccess(false);
      setShowAlert(true);
    }
  };

  const handleCloseAlert = () => {
    if (isSuccess) {
      history.push('/admins/members');
    } else {
      setShowAlert(false);
    }
  };

  const handleCancel = () => {
    history.push('/admins/members');
  };

  const handleReset = () => {
    reset();
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

  return (
    <Container>
      <div className={styles.formContainer}>
        <h2 className={styles.formTitle}>{id ? 'Update Member' : 'Add Member'}</h2>
        <SharedModal
          isDelete={false}
          show={showAlert}
          closeModal={handleCloseAlert}
          typeStyle={isSuccess ? 'success' : 'error'}
          title={isSuccess ? 'Success' : 'Something went wrong'}
          body={alertMessage}
          testId={'admin-memebrs-form-modal'}
          closeTestId={'admin-memebrs-form-button-confirm-modal'}
        />
        <form className={styles.formMembers} onSubmit={handleSubmit(onSubmit)}>
          <div className={`${styles.formColumn} ${styles.formLeft}`}>
            <Input
              register={register}
              labelName={'First Name'}
              inputType={'text'}
              inputName={'firstName'}
              error={errors.firstName?.message}
              testId={'admin-members-input-first-name'}
            />
            <Input
              register={register}
              labelName={'Last Name'}
              inputType={'text'}
              inputName={'lastName'}
              error={errors.lastName?.message}
              testId={'admin-members-input-last-name'}
            />
            <Input
              register={register}
              labelName={'DNI'}
              inputType={'number'}
              inputName={'dni'}
              error={errors.dni?.message}
              testId={'admin-members-input-dni'}
            />
            <Input
              register={register}
              labelName={'Phone'}
              inputType={'number'}
              inputName={'phone'}
              error={errors.phone?.message}
              testId={'admin-members-input-phone'}
            />
            <Input
              register={register}
              labelName={'Email'}
              inputType={'text'}
              inputName={'email'}
              error={errors.email?.message}
              testId={'admin-members-input-email'}
            />
          </div>
          <div className={`${styles.formColumn} ${styles.formRight}`}>
            <Input
              register={register}
              labelName={'Password'}
              inputType={'password'}
              inputName={'password'}
              error={errors.password?.message}
              testId={'admin-members-input-password'}
            />
            <Input
              register={register}
              labelName={'City'}
              inputType={'text'}
              inputName={'city'}
              error={errors.city?.message}
              testId={'admin-members-input-city'}
            />
            <Input
              register={register}
              labelName={'Date of birth'}
              inputType={'date'}
              inputName={'birthDay'}
              error={errors.birthDay?.message}
              testId={'admin-members-input-date'}
            />
            <Input
              register={register}
              labelName={'Postal Code'}
              inputType={'number'}
              inputName={'postalCode'}
              error={errors.postalCode?.message}
              testId={'admin-members-input-zip'}
            />
            <Input
              register={register}
              labelName={'Memberships'}
              inputType={'list'}
              list={membership}
              inputName={'membership'}
              error={errors.membership?.message}
              testId={'admin-members-input-memebrship'}
            />
            <Input
              register={register}
              labelName={'Active ?'}
              inputType={'isActive'}
              inputName={'isActive'}
              error={errors.isActive}
              testId={'admin-members-input-checkbox'}
            />
          </div>
          <div className={styles.buttonContainer}>
            <Button
              text={id ? 'Update' : 'Add'}
              type={'submit'}
              info={'submit'}
              testId={'admin-members-button-submit-form'}
            />
            <div className={styles.buttonsLowContainer}>
              <Button
                text={'Back'}
                type={'cancel'}
                clickAction={handleCancel}
                testId={'admin-members-button-back-form'}
              />
              <Button
                type={'cancel'}
                clickAction={handleReset}
                info={'reset'}
                text={'Reset'}
                testId={'admin-members-button-reset-form'}
              />
            </div>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default MemberForm;
