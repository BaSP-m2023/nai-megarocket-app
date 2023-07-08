import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styles from './login.module.css';
import Button from 'Components/Shared/Button';
import InputComponent from 'Components/Shared/Input';
import loginValidation from 'Validations/login';
import { joiResolver } from '@hookform/resolvers/joi';
import { FaRegEye, FaEyeSlash } from 'react-icons/fa';
import Container from 'Components/Shared/Container';
import { login } from 'Redux/auth/thunks';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { LOGIN_SUCCESS } from 'Redux/auth/constants';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'all',
    resolver: joiResolver(loginValidation)
  });

  useEffect(() => {
    toast.remove();
    const toastMessage = localStorage.getItem('toastMessage');
    if (toastMessage) {
      showToast(toastMessage, 'success');
      localStorage.removeItem('toastMessage');
    }
  }, []);

  const showToast = (message, type) => {
    if (type === 'success') {
      toast.success(message, {
        duration: 2500,
        position: 'bottom-center',
        style: {
          background: '#fddba1'
        },
        icon: '💪',
        iconTheme: {
          primary: '#0f232e',
          secondary: '#fff'
        }
      });
    } else if (type === 'error') {
      toast.error(message, {
        duration: 4000,
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

  const handleLogin = async (data) => {
    try {
      const response = await dispatch(login(data));
      if (response.type === LOGIN_SUCCESS) {
        switch (response.payload.role) {
          case 'SUPER_ADMIN':
            history.push('/super-admins/home');
            localStorage.setItem('toastMessage', 'Welcome to MegaRocketGYM');
            break;
          case 'ADMIN':
            history.push('/admins/home');
            localStorage.setItem('toastMessage', 'Welcome to MegaRocketGYM');
            break;
          case 'TRAINER':
            history.push('/trainers/home');
            localStorage.setItem('toastMessage', 'Welcome to MegaRocketGYM');
            break;
          case 'MEMBER':
            history.push('/members/home');
            localStorage.setItem('toastMessage', 'Welcome to MegaRocketGYM');
            break;
          default:
            history.push('/auth/login');
        }
      } else {
        showToast('Wrong email or password!', 'error');
      }
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  const handleRegister = () => {
    history.push('/auth/register');
  };

  return (
    <Container isLogin={true}>
      <Toaster />
      <div className={styles.big}>
        <div className={styles.container}>
          <form onSubmit={handleSubmit(handleLogin)} className={styles.form}>
            <h2>Login</h2>
            <div className={styles.emailContainer}>
              <InputComponent
                inputName="email"
                inputType="text"
                labelName="Email"
                placeholder={'Email'}
                register={register}
                error={errors.email?.message}
                testId={'login-input-email'}
                errorTestId={'login-input-email-error'}
              />
            </div>
            <div className={styles.passwordContainer}>
              <div>
                <InputComponent
                  inputName="password"
                  inputType={showPassword ? 'text' : 'password'}
                  id="password"
                  labelName="Password"
                  placeholder={'Password'}
                  register={register}
                  error={errors.password?.message}
                  testId={'login-input-password'}
                  errorTestId={'login-input-password-error'}
                />
              </div>
              <button
                id="login-eye-button"
                className={styles.eyeButton}
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaRegEye />}
              </button>
            </div>
            <Button testId={'login-button-submit'} type="submit" text={'Log In'} />
            <Button
              testId={'login-button-register'}
              type="submit"
              text={'Create an Account'}
              clickAction={handleRegister}
            />
          </form>
        </div>
      </div>
    </Container>
  );
};

export default Login;
