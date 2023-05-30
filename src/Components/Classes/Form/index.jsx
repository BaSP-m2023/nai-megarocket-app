import React, { useState, useEffect } from 'react';
import styles from './form.module.css';

const Form = ({ onSubmit, onCancel, editMode, classes }) => {
  const [day, setDay] = useState('');
  const [hour, setHour] = useState('');
  const [trainer, setTrainer] = useState('');
  const [activity, setActivity] = useState('');
  const [slots, setSlots] = useState('');

  useEffect(() => {
    if (editMode && classes) {
      setDay(classes.day);
      setHour(classes.hour);
      setTrainer(classes.trainer);
      setActivity(classes.activity);
      setSlots(classes.slots);
    }
  }, [editMode, classes]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      day,
      hour,
      trainer,
      activity,
      slots
    };
    onSubmit(formData);
    setDay('');
    setHour('');
    setTrainer('');
    setActivity('');
    setSlots('');
  };

  const handleCancel = () => {
    onCancel();
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
        </div>
        <div className={styles.box}>
          <h4>Hour</h4>
          <input
            type="text"
            placeholder="Hour"
            value={hour}
            onChange={(e) => setHour(e.target.value)}
            required
          />
        </div>
        <div className={styles.box}>
          <h4>Trainer</h4>
          <input
            type="text"
            placeholder="Trainer"
            value={trainer}
            onChange={(e) => setTrainer(e.target.value)}
            required
          />
        </div>
        <div className={styles.box}>
          <h4>Activity</h4>
          <input
            type="text"
            placeholder="Activity"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            required
          />
        </div>
        <div className={styles.box}>
          <h4>Slots</h4>
          <input
            type="number"
            placeholder="Slots"
            value={slots}
            onChange={(e) => setSlots(e.target.value)}
            required
          />
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
