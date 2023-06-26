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
      if (response.ok) {
        alert('User logged!');
        history.push('/');
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
              />
            </div>
            <button
              className={styles.eyeButton}
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaRegEye />}
            </button>
          </div>
          <Button type="submit" text={'Log In'} />
          <Button type="submit" text={'Create an Account'} clickAction={handleRegister} />
        </form>
      </div>
    </Container>
  );
};
export default Login;
