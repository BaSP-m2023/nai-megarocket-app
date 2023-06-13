import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { editClass, addClass } from '../../../Redux/classes/thunks';
import { getActivities } from '../../../Redux/activities/thunks';
import { getTrainers } from '../../../Redux/trainers/thunks';
import { useSelector, useDispatch } from 'react-redux';
import styles from './form.module.css';
import Button from '../../Shared/Button';
import SharedModal from '../../Shared/Modal';

const Form = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const gymClasses = useSelector((state) => state.classes.data.data);
  const { trainers = [], activities = [] } = useSelector((state) => ({
    trainers: state.trainers.data,
    activities: state.activities.data.data
  }));
  const [day, setDay] = useState([]);
  const [hour, setHour] = useState('');
  const [trainer, setTrainer] = useState('');
  const [activity, setActivity] = useState('');
  const [slots, setSlots] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    dispatch(getTrainers());
    dispatch(getActivities());
    if (id) {
      const classToUpdate = gymClasses.find((gymClass) => gymClass._id === id);
      setDay(classToUpdate.day);
      setHour(classToUpdate.hour);
      setTrainer(classToUpdate.trainer._id);
      setActivity(classToUpdate.activity._id);
      setSlots(classToUpdate.slots);
    }
  }, [id]);

  const dayArray = Array.isArray(day) ? day : day.split(',').map((d) => d.trim());
  const gymClass = {
    day: dayArray,
    hour,
    trainer: trainer,
    activity: activity,
    slots: parseInt(slots)
  };

  const updateClass = async () => {
    try {
      const data = await dispatch(editClass(id, gymClass));
      setAlertMessage(data.message);
      setIsSuccess(true);
      setShowAlert(true);
    } catch (error) {
      setAlertMessage(error.message);
      setIsSuccess(false);
      setShowAlert(true);
    }
  };

  const createClass = async () => {
    try {
      const data = await dispatch(addClass(gymClass));
      setAlertMessage(data.message);
      setIsSuccess(true);
      setShowAlert(true);
    } catch (error) {
      setAlertMessage(error.message);
      setIsSuccess(false);
      setShowAlert(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      updateClass();
    } else {
      createClass();
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

  const renderTrainer = () => (
    <>
      {!id && <option value="">Select a trainer</option>}
      {trainers.map((trainer) => (
        <option key={trainer._id} value={trainer._id}>
          {trainer.firstName}
        </option>
      ))}
    </>
  );

  const renderActivity = () => (
    <>
      {!id && <option value="">Select activity</option>}
      {activities.map((activity) => (
        <option key={activity._id} value={activity._id}>
          {activity.name}
        </option>
      ))}
    </>
  );

  const activityChange = (e) => {
    const selectedActivity = e.target.value;
    setActivity(selectedActivity);
  };

  const trainerChange = (e) => {
    const selectedTrainer = e.target.value;
    setTrainer(selectedTrainer);
  };

  const slotsChange = (e) => {
    const selectedSlots = e.target.value;
    setSlots(selectedSlots);
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.container}>
          <h2>{id ? 'Update Class' : 'Create Class'}</h2>
          <div className={styles.box}>
            <h4>Day</h4>
            <input
              className={styles.inputClasses}
              type="text"
              placeholder="Day"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              required
            />
            <small>Enter the days seperated for comas</small>
          </div>
          <div className={styles.box}>
            <h4>Hour</h4>
            <input
              className={styles.inputClasses}
              type="text"
              placeholder="Hour"
              pattern="[0-9]{2}:[0-9]{2}"
              value={hour}
              onChange={(e) => setHour(e.target.value)}
              required
            />
            <small>Please enter the hour in HH:MM format.</small>
          </div>
          <div className={styles.box}>
            <h4>Trainer</h4>
            <select value={trainer} className={styles.select} onChange={trainerChange} required>
              {renderTrainer()};
            </select>
          </div>
          <div className={styles.box}>
            <h4>Activity</h4>
            <select value={activity} onChange={activityChange} required>
              {renderActivity()};
            </select>
          </div>
          <div className={styles.box}>
            <h4>Slots</h4>
            <input
              type="number"
              placeholder="Slots"
              value={slots}
              onChange={slotsChange}
              required
            />
          </div>
        </div>
        <div className={styles.buttonsDiv}>
          <Button type="cancel" text="Cancel" clickAction={handleCancel} />
          <Button
            type={id ? 'submit' : 'submit'}
            text={id ? 'Submit' : 'Confirm'}
            onSubmit={handleSubmit}
          />
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
