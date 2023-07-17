import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import toast, { Toaster } from 'react-hot-toast';
import { editClass, addClass } from 'Redux/classes/thunks';
import classValidation from 'Validations/Admin/classes';
import styles from './form.module.css';
import Button from 'Components/Shared/Button';
import Input from 'Components/Shared/Input';
import Container from 'Components/Shared/Container';
import { FormControl, InputLabel, FormHelperText, MenuItem, Select } from '@mui/material';
import { FiArrowLeft } from 'react-icons/fi';

const Form = () => {
  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(classValidation),
    defaultValues: {
      day: [],
      hour: '',
      trainer: '',
      activity: '',
      slots: ''
    }
  });
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    trainers = [],
    activities = [],
    classes = []
  } = useSelector((state) => ({
    trainers: state.trainers?.data,
    activities: state.activities?.data?.data,
    classes: state.classes?.data?.data
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
      const classData = classes.find((gymClass) => gymClass._id === id);
      delete classData?._id;
      delete classData?.createdAt;
      delete classData?.updatedAt;
      delete classData?.__v;
      delete classData?.subscriptions;
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
    toast.remove();
    if (id) {
      getClassData();
    }
  }, []);

  const onSubmit = (data) => {
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
          <div className={styles.head}>
            {' '}
            <div id="admin-form-go-back" className={styles.arrow} onClick={handleCancel}>
              <FiArrowLeft size={35} />
            </div>
            <h2 className={styles.formTitle}> {id ? 'Update Class' : 'Add Class'}</h2>
          </div>
          <div className={styles.inputsContainer}>
            <div className={styles.inputContainerA}>
              <FormControl variant="standard" fullWidth error={errors.day?.message ? true : false}>
                <InputLabel id="day-label">Day</InputLabel>
                <Controller
                  control={control}
                  name="day"
                  render={({ field }) => (
                    <Select
                      {...field}
                      multiple
                      value={field.value || []}
                      onChange={(e) => field.onChange(e.target.value)}
                      id={'admin-input-day'}
                    >
                      {daysOfWeek.map((day) => (
                        <MenuItem
                          key={day}
                          value={day}
                          id={'admin-input-day-' + day.toString().toLowerCase()}
                        >
                          {day}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <FormHelperText>{errors.day?.message}</FormHelperText>
              </FormControl>
              <FormControl variant="standard" fullWidth error={errors.hour?.message ? true : false}>
                <InputLabel id="hour-label">Hour</InputLabel>
                <Controller
                  control={control}
                  name="hour"
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      id={'admin-input-hour'}
                    >
                      {hoursOfDay.map((hour) => (
                        <MenuItem key={hour} value={hour} id={'admin-input-hour-' + hour}>
                          {hour}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <FormHelperText>{errors.hour?.message}</FormHelperText>
              </FormControl>
              <FormControl
                variant="standard"
                fullWidth
                error={errors.trainer?.message ? true : false}
              >
                <InputLabel id="trainer-label">Trainer</InputLabel>
                <Controller
                  control={control}
                  name="trainer"
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      id={'admin-input-trainer'}
                    >
                      {trainers.map((trainer, index) => (
                        <MenuItem
                          key={trainer._id}
                          value={trainer._id}
                          id={`admin-input-trainer-` + index}
                        >
                          {trainer.firstName}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <FormHelperText>{errors.trainer?.message}</FormHelperText>
              </FormControl>
            </div>
            <div className={styles.inputContainerB}>
              <FormControl
                variant="standard"
                fullWidth
                error={errors.activity?.message ? true : false}
              >
                <InputLabel id="activity-label">Activity</InputLabel>
                <Controller
                  control={control}
                  name="activity"
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      id={'admin-input-activity'}
                    >
                      {activities.map((activity, index) => (
                        <MenuItem
                          key={activity._id}
                          value={activity._id}
                          id={'admin-input-activity-' + index}
                        >
                          {activity.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <FormHelperText>{errors.activity?.message}</FormHelperText>
              </FormControl>
              <Input
                register={register}
                labelName={'Slots'}
                inputType={'number'}
                inputName={'slots'}
                error={errors.slots?.message}
                testId={'admin-input-slots'}
              />
            </div>
          </div>
        </div>
        <div className={styles.buttonsDiv}>
          <Button
            type="submit"
            info="submit"
            text={id ? 'Update' : 'Add'}
            testId={'admin-button-submit-form'}
          />
        </div>
      </form>
    </Container>
  );
};

export default Form;
