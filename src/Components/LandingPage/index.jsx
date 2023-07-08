import React, { useEffect } from 'react';
import styles from './landing.module.css';
import stylesForm from './form.module.css';
import stylesJoin from './join.module.css';
import stylesTrainers from './trainers.module.css';
import Footer from 'Components/Footer';
import Input from 'Components/Shared/Input';
import { toast, Toaster } from 'react-hot-toast';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import Button from 'Components/Shared/Button';
import Form from 'Components/Shared/Form';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Landing = () => {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    }
  });

  useEffect(() => {
    toast.remove();
  }, []);

  const handleRegister = () => {
    history.push('/auth/register');
  };

  const onSubmit = async () => {};

  return (
    <>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img src="/assets/images/landing/img-gym-001.jpg" alt="gym image" />
          <div className={styles.overlay}>
            <div className={styles.content}>
              <h2>megarocket</h2>
              <p>it&apos;s gym. it&apos;s life</p>
            </div>
          </div>
        </div>
        <div className={stylesJoin.joinButtonDiv}>
          <Button
            testId={'login-button-register'}
            type="submit"
            className={stylesJoin.joinButton}
            text={'join our gym'}
            clickAction={handleRegister}
          />
        </div>
        <div className={stylesTrainers.trainerContainer}>
          <div className={stylesTrainers.trainer1}></div>
          <div className={stylesTrainers.trainer2}></div>
          <div className={stylesTrainers.trainer3}></div>
          <div className={stylesTrainers.trainer4}></div>
          <div className={stylesTrainers.trainer5}></div>
        </div>
        <div className={stylesJoin.joined}>
          <p>be fit &#8226; be happy &#124; be megarocket</p>
        </div>
        <div className={stylesJoin.landscape}>
          <Button
            testId={'login-button-register'}
            type="submit"
            className={stylesJoin.joinButton}
            text={'join now'}
            clickAction={handleRegister}
          />
        </div>
        <div className={stylesForm.formContainer}>
          <Toaster
            containerStyle={{
              margin: '10vh 0 0 0'
            }}
          />
          <h2>contact us</h2>
          <Form onSubmit={handleSubmit(onSubmit)} className={stylesForm.form}>
            <div className={stylesForm.inputsDiv}>
              <div className={stylesForm.namesFieldset}>
                <Input
                  register={register}
                  placeholder={'First Name'}
                  inputType={'text'}
                  inputName={'firstName'}
                  error={errors.firstName?.message}
                />
                <Input
                  register={register}
                  placeholder={'Last Name'}
                  inputType={'text'}
                  inputName={'lastName'}
                  error={errors.lastName?.message}
                />
              </div>
              <div className={stylesForm.contactFieldset}>
                <Input
                  register={register}
                  placeholder={'Email'}
                  inputType={'text'}
                  inputName={'email'}
                  error={errors.email?.message}
                />
                <Input
                  register={register}
                  placeholder={'Phone'}
                  inputType={'text'}
                  inputName={'phone'}
                  inputMode={'numeric'}
                  error={errors.phone?.message}
                />
              </div>
            </div>
            <div className={stylesForm.buttonsDiv}>
              <Button text={'Send'} type="submit" info={'submit'} />
            </div>
          </Form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Landing;
