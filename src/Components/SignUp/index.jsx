import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addMember } from 'Redux/members/thunks';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { getMembers } from 'Redux/members/thunks';
import styles from './signup.module.css';
import SharedModal from 'Components/Shared/Modal';
import Button from 'Components/Shared/Button';
import Input from 'Components/Shared/Input';
import memberValidation from 'Validations/signup';
import Container from 'Components/Shared/Container';

const SignUp = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMembers());
  }, []);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'all',
    resolver: joiResolver(memberValidation)
  });
  const onSubmit = (data) => {
    memberAddFunction(data);
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
      history.push('/auth/login');
    } else {
      setShowAlert(false);
    }
  };
  const handleCancel = () => {
    history.push('/auth/login');
  };
  const handleReset = () => {
    reset();
  };
  return (
    <Container isLogin={true}>
      <div className={styles.formContainer}>
        <h2 className={styles.formTitle}>{'Sign Up'}</h2>
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
          </div>
          <div className={styles.buttonContainer}>
            <Button text={'Add'} type={'submit'} info={'submit'} />
            <div className={styles.buttonsLowContainer}>
              <Button text={'Back'} type={'cancel'} clickAction={handleCancel} />
              <Button type={'cancel'} onClick={handleReset} info={'reset'} text={'Reset'} />
            </div>
          </div>
        </form>
      </div>
    </Container>
  );
};
export default SignUp;
