import React, { useState } from 'react';
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

  const handleLogin = async (data) => {
    try {
      const response = await dispatch(login(data));
      console.log(response);
      if (response.type === LOGIN_SUCCESS) {
        alert(`Welcome ${response.payload.role}`);
        switch (response.payload.role) {
          case 'SUPER_ADMIN':
            history.push('/super-admins');
            break;
          case 'ADMIN':
            history.push('/admins');
            break;
          case 'MEMBER':
            history.push('/members');
            break;
          default:
            history.push('/');
        }
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      alert(error);
    }
  };
  const handleRegister = () => {
    history.push('/auth/register');
  };
  return (
    <Container>
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
              id="eye-button"
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
    </Container>
  );
};

export default Login;
