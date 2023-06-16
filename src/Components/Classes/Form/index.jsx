import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { editClass, addClass, getClassById } from '../../../Redux/classes/thunks';
import { getActivities } from '../../../Redux/activities/thunks';
import { getTrainers } from '../../../Redux/trainers/thunks';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import classValidation from '../../../validations/classes';
import styles from './form.module.css';
import Button from '../../Shared/Button';
import Input from '../../Shared/Input';
import SharedModal from '../../Shared/Modal';

const Form = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(classValidation)
  });
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { trainers = [], activities = [] } = useSelector((state) => ({
    trainers: state.trainers.data,
    activities: state.activities.data.data
  }));
  const [showAlert, setShowAlert] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const showSuccesModal = (data) => {
    setAlertMessage(data.message);
    setIsSuccess(true);
    setShowAlert(true);
  };
  const showErrorModal = (error) => {
    setAlertMessage(error.message);
    setIsSuccess(false);
    setShowAlert(true);
  };

  const getClassData = async () => {
    try {
      const response = await dispatch(getClassById(id));
      const classData = response.data;
      delete classData._id;
      delete classData.createdAt;
      delete classData.updatedAt;
      delete classData.__v;
      classData.day = Object.values(classData.day).join(',');
      classData.trainer = classData.trainer._id;
      classData.activity = classData.activity._id;
      reset(classData);
    } catch (error) {
      console.log(error);
    }
  };

  const updateClass = async (data) => {
    try {
      const response = await dispatch(editClass(id, data));
      showSuccesModal(response);
    } catch (error) {
      showErrorModal(error);
    }
  };

  const createClass = async (data) => {
    try {
      const response = await dispatch(addClass(data));
      showSuccesModal(response);
    } catch (error) {
      showErrorModal(error);
      console.log(data);
    }
  };

  useEffect(() => {
    dispatch(getTrainers());
    dispatch(getActivities());
    if (id) {
      getClassData();
    }
  }, []);

  const onSubmit = (data) => {
    data.day = data.day.split(',').map((day) => day.trim());
    if (id) {
      updateClass(data);
    } else {
      createClass(data);
    }
  };

  const handleCancel = () => {
    history.push('/classes');
  };

  const handleCloseAlert = () => {
    if (isSuccess) {
      history.push('/classes');
    } else {
      setShowAlert(false);
    }
  };

  const handleReset = () => {
    reset();
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.container}>
          <h2>{id ? 'Update Class' : 'Create Class'}</h2>
          <Input
            register={register}
            labelName={'Day'}
            inputType={'text'}
            inputName={'day'}
            error={errors.day?.message}
          />
          <Input
            register={register}
            labelName={'Hour'}
            inputType={'text'}
            inputName={'hour'}
            error={errors.hour?.message}
          />
          <Input
            register={register}
            labelName={'Trainer'}
            inputType={'list'}
            inputName={'trainer'}
            list={trainers}
            listProp={'firstName'}
            error={errors.trainer?.message}
          />
          <Input
            register={register}
            labelName={'Activity'}
            inputType={'list'}
            inputName={'activity'}
            error={errors.activity?.message}
            list={activities}
            listProp={'name'}
          />
          <Input
            register={register}
            labelName={'Slots'}
            inputType={'number'}
            inputName={'slots'}
            error={errors.slots?.message}
          />
        </div>
        <div className={styles.buttonsDiv}>
          <div className={styles.confirmButton}>
            <Button type="submit" text="Back" clickAction={handleCancel} />
            <Button type={'submit'} info={'submit'} text={id ? 'Update' : 'Add'} />
          </div>
          <Button type={'cancel'} onClick={handleReset} info={'reset'} text={'Reset'} />
        </div>
      </form>

      <SharedModal
        isDelete={false}
        show={showAlert}
        closeModal={() => handleCloseAlert()}
        typeStyle={isSuccess ? 'success' : 'error'}
        title={isSuccess ? 'Success' : 'Something went wrong'}
        body={alertMessage}
      />
    </>
  );
};

export default Form;
