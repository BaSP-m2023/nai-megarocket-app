import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { editClass, addClass } from 'Redux/classes/thunks';
import { getActivities } from 'Redux/activities/thunks';
import { getTrainers } from 'Redux/trainers/thunks';
import { useSelector, useDispatch } from 'react-redux';
import styles from './form.module.css';
import Button from '../../Shared/Button';
import SharedModal from '../../Shared/Modal';

const Form = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    trainers = [],
    activities = [],
    gymClasses = []
  } = useSelector((state) => ({
    trainers: state.trainers.data,
    activities: state.activities.data.data,
    gymClasses: state.classes.data.data
  }));
  const [day, setDay] = useState([]);
  const [hour, setHour] = useState('');
  const [trainer, setTrainer] = useState('');
  const [activity, setActivity] = useState('');
  const [slots, setSlots] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const loadClassData = () => {
    const classToUpdate = gymClasses.find((gymClass) => gymClass._id === id);
    setDay(classToUpdate.day);
    setHour(classToUpdate.hour);
    setTrainer(classToUpdate.trainer._id);
    setActivity(classToUpdate.activity._id);
    setSlots(classToUpdate.slots);
  };
  const dayArray = Array.isArray(day) ? day : day.split(',').map((d) => d.trim());
  const gymClass = {
    day: dayArray,
    hour,
    trainer: trainer,
    activity: activity,
    slots: parseInt(slots)
  };
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

  useEffect(() => {
    dispatch(getTrainers());
    dispatch(getActivities());
    if (id) {
      loadClassData();
    }
  }, [id]);

  const updateClass = async () => {
    try {
      const data = await dispatch(editClass(id, gymClass));
      showSuccesModal(data);
    } catch (error) {
      showErrorModal(error);
    }
  };

  const createClass = async () => {
    try {
      const data = await dispatch(addClass(gymClass));
      showSuccesModal(data);
    } catch (error) {
      showErrorModal(error);
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
      {!id && <option value="">Choose a trainer</option>}
      {trainers.map((trainer) => (
        <option key={trainer._id} value={trainer._id}>
          {trainer.firstName}
        </option>
      ))}
    </>
  );

  const renderActivity = () => (
    <>
      {!id && <option value="">Choose a activity</option>}
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

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.container}>
          <h2>{id ? 'Update Class' : 'Create Class'}</h2>
          <div className={styles.box}>
            <label>Day</label>
            <input
              className={styles.inputClasses}
              type="text"
              placeholder="Monday,Thursday"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              required
            />
          </div>
          <div className={styles.box}>
            <label>Hour</label>
            <input
              className={styles.inputClasses}
              type="text"
              placeholder="08:00"
              pattern="[0-9]{2}:[0-9]{2}"
              value={hour}
              onChange={(e) => setHour(e.target.value)}
              required
            />
          </div>
          <div className={styles.box}>
            <label>Trainer</label>
            <select value={trainer} className={styles.select} onChange={trainerChange} required>
              {renderTrainer()};
            </select>
          </div>
          <div className={styles.box}>
            <label>Activity</label>
            <select value={activity} className={styles.select} onChange={activityChange} required>
              {renderActivity()};
            </select>
          </div>
          <div className={styles.box}>
            <label>Slots</label>
            <input
              className={styles.inputClasses}
              type="number"
              placeholder="5"
              value={slots}
              onChange={(e) => setSlots(e.target.value)}
              required
            />
          </div>
        </div>
        <div className={styles.buttonsDiv}>
          <Button type="cancel" text="Cancel" clickAction={handleCancel} />
          <div className={styles.confirmButton}>
            <Button type={'submit'} text={id ? 'Update' : 'Add'} onSubmit={handleSubmit} />
          </div>
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
