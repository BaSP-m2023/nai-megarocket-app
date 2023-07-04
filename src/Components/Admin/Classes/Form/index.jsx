import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { editClass, addClass, getClassById } from 'Redux/classes/thunks';
import { getActivities } from 'Redux/activities/thunks';
import { getTrainers } from 'Redux/trainers/thunks';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import classValidation from 'Validations/classes';
import styles from './form.module.css';
import Button from 'Components/Shared/Button';
import Input from 'Components/Shared/Input';
import Container from 'Components/Shared/Container';
import toast, { Toaster } from 'react-hot-toast';

const Form = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(classValidation),
    defaultValues: {
      day: '',
      hour: '',
      trainer: '',
      activity: '',
      slots: ''
    }
  });
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { trainers = [], activities = [] } = useSelector((state) => ({
    trainers: state.trainers.data,
    activities: state.activities.data.data
  }));
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const hoursOfDay = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00'
  ];
  const getClassData = async () => {
    try {
      const response = await dispatch(getClassById(id));
      const classData = response.data;
      delete classData?._id;
      delete classData?.createdAt;
      delete classData?.updatedAt;
      delete classData?.__v;
      classData.day = Object.values(classData?.day).join(',');
      classData.trainer = classData.trainer?._id;
      classData.activity = classData.activity?._id;
      reset(classData);
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  const updateClass = async (data) => {
    try {
      const response = await dispatch(editClass(id, data));
      localStorage.setItem('toastMessage', response.message);
      history.push('/admins/classes');
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  const createClass = async (data) => {
    try {
      const response = await dispatch(addClass(data));
      localStorage.setItem('toastMessage', response.message);
      history.push('/admins/classes');
    } catch (error) {
      showErrorToast(error.message);
    }
  };

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
    history.push('/admins/classes');
  };

  return (
    <Container>
      <Toaster
        containerStyle={{
          margin: '10vh 0 0 0'
        }}
      />
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.container}>
          <h2>{id ? 'Update Class' : 'Create Class'}</h2>
          <div className={styles.inputsContainer}>
            <div className={styles.inputContainerA}>
              <Input
                register={register}
                labelName={'Day'}
                inputType={'list'}
                inputName={'day'}
                list={daysOfWeek}
                listProp={'day'}
                error={errors.day?.message}
                testId={'admin-classes-input-day'}
              />
              <Input
                register={register}
                labelName={'Hour'}
                inputType={'list'}
                inputName={'hour'}
                list={hoursOfDay}
                listProp={'hours'}
                error={errors.hour?.message}
                testId={'admin-classes-input-hour'}
              />
              <Input
                register={register}
                labelName={'Trainer'}
                inputType={'list'}
                inputName={'trainer'}
                list={trainers}
                listProp={'firstName'}
                error={errors.trainer?.message}
                testId={'admin-classes-input-trainer'}
              />
            </div>
            <div className={styles.inputContainerB}>
              <Input
                register={register}
                labelName={'Activity'}
                inputType={'list'}
                inputName={'activity'}
                error={errors.activity?.message}
                list={activities}
                listProp={'name'}
                testId={'admin-classes-input-activity'}
              />
              <Input
                register={register}
                labelName={'Slots'}
                inputType={'number'}
                inputName={'slots'}
                error={errors.slots?.message}
                testId={'admin-classes-input-slots'}
              />
            </div>
          </div>
        </div>
        <div className={styles.buttonsDiv}>
          <Button
            type={'submit'}
            info={'submit'}
            text={id ? 'Update' : 'Add'}
            testId={'admin-classes-button-submit-form'}
          />
          <div className={styles.confirmButton}>
            <Button
              type="cancel"
              text="Back"
              clickAction={handleCancel}
              testId={'admin-classes-button-back-form'}
            />
            <Button
              type={'cancel'}
              clickAction={() => reset()}
              info={'reset'}
              text={'Reset'}
              testId={'admin-classes-button-reset-form'}
            />
          </div>
        </div>
      </form>
    </Container>
  );
};

export default Form;
