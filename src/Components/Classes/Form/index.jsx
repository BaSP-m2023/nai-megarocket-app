import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styles from './form.module.css';
import Button from '../../Shared/Button';
import SharedModal from '../../Shared/Modal';

const Form = () => {
  const history = useHistory();
  const { id } = useParams();
  const [day, setDay] = useState([]);
  const [hour, setHour] = useState('');
  const [trainer, setTrainer] = useState('');
  const [activity, setActivity] = useState('');
  const [slots, setSlots] = useState('');
  const [activities, setActivities] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const getClasses = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/classes/${id}`);
      const data = await response.json();
      const classes = data.data;
      setDay(classes.day);
      setHour(classes.hour);
      setTrainer(classes.trainer?._id);
      setActivity(classes.activity?._id);
      setSlots(classes.slots);
    } catch (error) {
      throw new Error(error);
    }
  };

  const fetchActivities = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activities`);
      const data = await response.json();
      setActivities(data.data);
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  const fetchTrainers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainers`);
      const data = await response.json();
      setTrainers(data.data);
    } catch (error) {
      console.error('Error fetching trainers:', error);
    }
  };

  const updateSubmit = async (formData) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/classes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (!response.ok) {
        setAlertMessage(data.message);
        setIsSuccess(false);
        setShowAlert(true);
      } else {
        setAlertMessage(data.message);
        setIsSuccess(true);
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error edited class:', error);
    }
  };

  const createSubmit = async (formData) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/classes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (!response.ok) {
        setAlertMessage(data.message);
        setIsSuccess(false);
        setShowAlert(true);
      } else {
        setAlertMessage(data.message);
        setIsSuccess(true);
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error adding class:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dayArray = Array.isArray(day) ? day : day.split(',').map((d) => d.trim());
    const formData = {
      day: dayArray,
      hour,
      trainer: trainer,
      activity: activity,
      slots: parseInt(slots)
    };
    if (id) {
      updateSubmit(formData);
    } else {
      createSubmit(formData);
    }
  };

  const handleCancel = () => {
    history.push('/classes');
  };

  useEffect(() => {
    if (id) {
      getClasses();
    }
    fetchActivities();
    fetchTrainers();
  }, []);

  const renderTrainer = () => {
    if (id) {
      return trainers.map((trainer) => (
        <option key={trainer._id} value={trainer._id}>
          {trainer.firstName}
        </option>
      ));
    } else {
      return (
        <>
          <option value="">Select a trainer</option>
          {trainers.map((trainer) => (
            <option key={trainer._id} value={trainer._id}>
              {trainer.firstName}
            </option>
          ))}
        </>
      );
    }
  };

  const renderActivity = () => {
    if (id) {
      return activities.map((activity) => (
        <option key={activity._id} value={activity._id}>
          {activity.name}
        </option>
      ));
    } else {
      return (
        <>
          <option value="">Select activity</option>
          {activities.map((activity) => (
            <option key={activity._id} value={activity._id}>
              {activity.name}
            </option>
          ))}
          ;
        </>
      );
    }
  };

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

  const handleCloseAlert = () => {
    if (isSuccess) {
      history.push('/classes');
    } else {
      setShowAlert(false);
    }
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
