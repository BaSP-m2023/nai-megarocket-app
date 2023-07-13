import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signUp } from 'Redux/auth/thunks';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import styles from './signup.module.css';
import Button from 'Components/Shared/Button';
import Input from 'Components/Shared/Input';
import memberValidation from 'Validations/signup';
import toast, { Toaster } from 'react-hot-toast';
import { FiArrowLeft } from 'react-icons/fi';

const SignUp = () => {
  const history = useHistory();
  const dispatch = useDispatch();

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

  const {
    register,
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
      const data = await dispatch(signUp(member));
      localStorage.setItem('toastMessage', data.message);
      history.push('/auth/login');
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  const handleCancel = () => {
    history.push('/auth/login');
  };

  return (
    <>
      <Toaster />
      <div className={styles.containerSignUp}>
        <div className={styles.imgSignUp}>
          <img src={`${process.env.PUBLIC_URL}/assets/images/Sign-up/coversignup.jpg`} alt=""></img>
        </div>
        <div className={styles.containerForm}>
          <div className={styles.head}>
            <div id="sign-up-form-go-back" className={styles.arrow} onClick={handleCancel}>
              <FiArrowLeft size={35} />
            </div>
            <h2 className={styles.formTitle}>{'Sign Up'}</h2>
          </div>
          <form className={styles.formMembers} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formColumn}>
              <Input
                register={register}
                labelName={'First Name'}
                inputType={'text'}
                inputName={'firstName'}
                error={errors.firstName?.message}
                testId={'sing-up-input-first-name'}
              />
              <Input
                register={register}
                labelName={'Last Name'}
                inputType={'text'}
                inputName={'lastName'}
                error={errors.lastName?.message}
                testId={'sing-up-input-last-name'}
              />
              <Input
                register={register}
                labelName={'DNI'}
                inputType={'number'}
                inputName={'dni'}
                error={errors.dni?.message}
                testId={'sing-up-input-dni'}
              />
              <Input
                register={register}
                labelName={'Phone'}
                inputType={'number'}
                inputName={'phone'}
                error={errors.phone?.message}
                testId={'sing-up-input-phone'}
              />
              <Input
                register={register}
                labelName={'Email'}
                inputType={'text'}
                inputName={'email'}
                error={errors.email?.message}
                testId={'sing-up-input-email'}
              />
            </div>
            <div className={styles.formColumn}>
              <Input
                register={register}
                labelName={'Password'}
                inputType={'password'}
                inputName={'password'}
                error={errors.password?.message}
                testId={'sing-up-input-password'}
              />
              <Input
                register={register}
                labelName={'City'}
                inputType={'text'}
                inputName={'city'}
                error={errors.city?.message}
                testId={'sing-up-input-city'}
              />
              <Input
                register={register}
                labelName={'Date of birth'}
                inputType={'date'}
                inputName={'birthDay'}
                error={errors.birthDay?.message}
                testId={'sing-up-input-date'}
              />
              <Input
                register={register}
                labelName={'Postal Code'}
                inputType={'number'}
                inputName={'postalCode'}
                error={errors.postalCode?.message}
                testId={'sing-up-input-postal-code'}
              />
              <Button text={'Add'} type={'submit'} info={'submit'} testId={'sing-up-button-add'} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
