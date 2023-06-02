import React, { useState, useEffect } from 'react';
import styles from './form.module.css';

const Form = ({ onSubmit, onCancel, editMode, classe }) => {
  const [day, setDay] = useState([]);
  const [hour, setHour] = useState('');
  const [trainer, setTrainer] = useState('');
  const [activity, setActivity] = useState('');
  const [slots, setSlots] = useState('');
  const [activities, setActivities] = useState([]);
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    if (editMode && classe) {
      setDay(classe.day);
      setHour(classe.hour);
      setTrainer(classe.trainer?._id);
      setActivity(classe.activity?._id);
      setSlots(classe.slots);
    }
  }, [editMode, classe]);

  useEffect(() => {
    fetchActivities();
    fetchTrainers();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_API_URL + '/api/activities');
      const data = await response.json();
      setActivities(data.data);
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  const fetchTrainers = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_API_URL + '/api/trainers');
      const data = await response.json();
      setTrainers(data.data);
    } catch (error) {
      console.error('Error fetching trainers:', error);
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
    onSubmit(formData);
    setDay([]);
    setHour('');
    setTrainer('');
    setActivity('');
    setSlots('');
  };

  const handleCancel = () => {
    onCancel();
  };

  const renderTrainer = () => {
    if (editMode) {
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
    if (editMode) {
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

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.container}>
        <div className={styles.box}>
          <h4>Day</h4>
          <input
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
          <select value={trainer} onChange={trainerChange} required>
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
          <input type="number" placeholder="Slots" value={slots} onChange={slotsChange} required />
        </div>
      </div>
      <div className={styles.buttons}>
        <button className={styles.button} type="button" onClick={handleCancel}>
          Cancel
        </button>
        <button className={styles.button} type="submit" onSubmit={handleSubmit}>
          {editMode ? <p>Edit</p> : <p>Add</p>}
        </button>
      </div>
    </form>
  );
};

export default Form;
