import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './login.module.css';
import Button from 'Components/Shared/Button';
import InputComponent from 'Components/Shared/Input';
import loginValidation from 'Validations/login';
import { joiResolver } from '@hookform/resolvers/joi';
import { FaRegEye, FaEyeSlash } from 'react-icons/fa';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    mode: 'all',
    resolver: joiResolver(loginValidation)
  });
  const handleLogin = (data) => {
    console.log('username', data.username);
    console.log('password', data.password);
  };
  const handleSetValue = (inputName, value) => {
    setValue(inputName, value);
  };
  const handleRegister = () => {
    history.push('/register');
  };
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(handleLogin)} className={styles.form}>
        <div className={styles.emailContainer}>
          <InputComponent
            inputName="email"
            inputType="text"
            labelName="Email"
            placeholder={'Email'}
            register={register}
            setValue={handleSetValue}
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
              setValue={handleSetValue}
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
  );
};
export default Login;
