import { useState, useEffect } from 'react';
import Input from '../Input';
import styles from './form.module.css';

const Form = ({ addItem, showForm, activityToEdit, editItem, activityId }) => {
  if (!showForm) {
    return null;
  }
  const [activities, setActivity] = useState({
    name: '',
    description: ''
  });

  useEffect(() => {
    if (activityToEdit) {
      setActivity({
        name: activityToEdit.name,
        description: activityToEdit.description
      });
    }
  }, [activityToEdit]);

  const onChangeInput = (e) => {
    setActivity({
      ...activities,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (activityToEdit) {
      editItem(activities, activityId);
    } else {
      addItem(activities);
    }
    setActivity({
      name: '',
      description: ''
    });
  };

  return (
    <div className={styles.container}>
      <h2>Form</h2>
      <form onSubmit={onSubmit}>
        <Input
          id="name"
          name="name"
          placeholder="Activity"
          value={activities.name}
          onChange={onChangeInput}
          required
        />
        <Input
          id="description"
          name="description"
          placeholder="Description"
          value={activities.description}
          onChange={onChangeInput}
          required
        />
        <button className={styles.submitButton} type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default Form;
