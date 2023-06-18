import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { updateTrainer, addTrainer } from 'Redux/trainers/thunks';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import trainerValidation from 'Validations/trainers';
import styles from './form.module.css';
import Button from '../../Shared/Button/index';
import SharedModal from '../../Shared/Modal/index';
import Input from '../../Shared/Input';

const Form = () => {
  const history = useHistory();
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalTypeStyle, setModalTypeStyle] = useState('success');
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const dispatch = useDispatch();
  const trainers = useSelector((state) => state.trainers.data);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(trainerValidation)
  });

  useEffect(() => {
    if (id) {
      getTrainerById(id);
    }
  }, []);

  const getTrainerById = (id) => {
    const trainer = trainers.find((trainer) => trainer._id === id);
    if (trainer) {
      delete trainer._id;
      delete trainer.__v;
      reset(trainer);
    } else {
      console.error('Trainer not found');
    }
  };

  const showSuccesModal = (data) => {
    setModalMessage(data.message);
    setModalTypeStyle('success');
    setShowModal(true);
    setShouldRedirect(true);
  };
  const showErrorModal = (error) => {
    setModalMessage(error.message);
    setModalTypeStyle('error');
    setShowModal(true);
  };

  const createTrainer = async (data) => {
    try {
      const response = await dispatch(addTrainer(data));
      showSuccesModal(response);
    } catch (error) {
      showErrorModal(error);
    }
  };

  const updateTrainerFunction = async (id, data) => {
    try {
      const response = await dispatch(updateTrainer(id, data));
      showSuccesModal(response);
    } catch (error) {
      showErrorModal(error);
    }
  };

  const onSubmit = (data) => {
    if (id) {
      updateTrainerFunction(id, data);
    } else {
      createTrainer(data);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (shouldRedirect) {
      history.push('/trainers');
    }
  };

  const handleCancel = () => {
    history.push('/trainers');
  };

  const handleReset = () => {
    reset();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.headContainer}>
        <h2>{id ? 'Update Trainer' : 'Add Trainer'}</h2>
      </div>
      <div className={styles.container}>
        <div className={styles.box}>
          <Input
            register={register}
            labelName={'Name'}
            inputType={'text'}
            inputName={'firstName'}
            error={errors.firstName?.message}
          />
        </div>
        <div className={styles.box}>
          <Input
            register={register}
            labelName={'Last Name'}
            inputType={'text'}
            inputName={'lastName'}
            error={errors.lastName?.message}
          />
        </div>
        <div className={styles.box}>
          <Input
            register={register}
            labelName={'DNI'}
            inputType={'number'}
            inputName={'dni'}
            error={errors.dni?.message}
          />
        </div>
        <div className={styles.box}>
          <Input
            register={register}
            labelName={'Phone Number'}
            inputType={'number'}
            inputName={'phone'}
            error={errors.phone?.message}
          />
        </div>
        <div className={styles.box}>
          <Input
            register={register}
            labelName={'Email'}
            inputType={'text'}
            inputName={'email'}
            error={errors.email?.message}
          />
        </div>
        <div className={styles.box}>
          <Input
            register={register}
            labelName={'City'}
            inputType={'text'}
            inputName={'city'}
            error={errors.city?.message}
          />
        </div>
        <div className={styles.box}>
          <Input
            register={register}
            labelName={'Salary'}
            inputType={'number'}
            inputName={'salary'}
            error={errors.salary?.message}
          />
        </div>
        <div className={styles.box}>
          <Input
            register={register}
            labelName={'Password'}
            inputType={'text'}
            inputName={'password'}
            error={errors.password?.message}
          />
        </div>
      </div>
      <div>
        <div className={styles.buttons}>
          <Button text="Back" type="cancel" clickAction={handleCancel} />
          <Button text={id ? 'Update' : 'Add'} type="submit" info={'submit'} />
        </div>
        <div className={styles.buttons}>
          <Button type={'cancel'} clickAction={handleReset} text={'Reset'} info={'reset'} />
        </div>
      </div>
      <SharedModal
        show={showModal}
        title={id ? 'Edit Trainer' : 'Add Trainer'}
        body={modalMessage}
        isDelete={false}
        typeStyle={modalTypeStyle}
        closeModal={handleCloseModal}
      />
    </form>
  );
};
export default Form;
