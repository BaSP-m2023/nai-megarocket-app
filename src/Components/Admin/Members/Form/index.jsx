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

const MemberForm = () => {
  const members = useSelector((state) => state.members.data.data);
  const [showAlert, setShowAlert] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const membership = ['Black', 'Gold', 'Silver'];
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
      history.push('/admin/members');
    } else {
      setShowAlert(false);
    }
  };

  const handleCancel = () => {
    history.push('/admin/members');
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
    <>
      <div className={styles.formContainer}>
        <h2 className={styles.formTitle}>{id ? 'Update Member' : 'Add Member'}</h2>
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
            />
            <Input
              register={register}
              labelName={'Last Name'}
              inputType={'text'}
              inputName={'lastName'}
              error={errors.lastName?.message}
            />
            <Input
              register={register}
              labelName={'DNI'}
              inputType={'number'}
              inputName={'dni'}
              error={errors.dni?.message}
            />
            <Input
              register={register}
              labelName={'Phone'}
              inputType={'number'}
              inputName={'phone'}
              error={errors.phone?.message}
            />
            <Input
              register={register}
              labelName={'Email'}
              inputType={'text'}
              inputName={'email'}
              error={errors.email?.message}
            />
          </div>
          <div className={`${styles.formColumn} ${styles.formRight}`}>
            <Input
              register={register}
              labelName={'Password'}
              inputType={'password'}
              inputName={'password'}
              error={errors.password?.message}
            />
            <Input
              register={register}
              labelName={'City'}
              inputType={'text'}
              inputName={'city'}
              error={errors.city?.message}
            />
            <Input
              register={register}
              labelName={'Date of birth'}
              inputType={'date'}
              inputName={'birthDay'}
              error={errors.birthDay?.message}
            />
            <Input
              register={register}
              labelName={'Postal Code'}
              inputType={'number'}
              inputName={'postalCode'}
              error={errors.postalCode?.message}
            />
            <Input
              register={register}
              labelName={'Memberships'}
              inputType={'list'}
              list={membership}
              inputName={'membership'}
              error={errors.membership?.message}
            />
            <Input
              register={register}
              labelName={'Active ?'}
              inputType={'isActive'}
              inputName={'isActive'}
              error={errors.isActive}
            />
          </div>
          <div className={styles.buttonContainer}>
            <Button text={id ? 'Update' : 'Add'} type={'submit'} info={'submit'} />
            <div className={styles.buttonsLowContainer}>
              <Button text={'Back'} type={'cancel'} clickAction={handleCancel} />
              <Button type={'cancel'} onClick={handleReset} info={'reset'} text={'Reset'} />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default MemberForm;
