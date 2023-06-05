import { useState, useEffect } from 'react';
import Input from '../Input';
import styles from './form.module.css';
import { useHistory, useParams } from 'react-router-dom';

const Form = () => {
  const history = useHistory();
  const { id } = useParams();

  const [activity, setActivity] = useState({
    name: '',
    description: ''
  });

  const getActivityById = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/${id}`);
      const { data } = await response.json();
      setActivity({ name: data.name, description: data.description });
    } catch (error) {
      console.error(error);
    }
  };

  const editItem = async (activity, id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(activity)
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        goBack();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      throw new Error('An error has ocurred creating the Activities');
    }
  };

  const addItem = async (activity) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(activity)
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setActivity({
          name: '',
          description: ''
        });
        goBack();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    if (id) {
      getActivityById(id);
    }
  }, []);

  const onChangeInput = (e) => {
    setActivity({
      ...activity,
      [e.target.name]: e.target.value
    });
    console.log('hola');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (id) {
      editItem(activity, id);
    } else {
      addItem(activity);
    }
  };

  const goBack = () => {
    history.push(`/activities`);
  };

  return (
    <div className={styles.container}>
      <h2>Form</h2>
      <form>
        <Input
          id="name"
          name="name"
          placeholder="Activity"
          value={activity.name}
          onChange={onChangeInput}
          required
        />
        <Input
          id="description"
          name="description"
          placeholder="Description"
          value={activity.description}
          onChange={onChangeInput}
          required
        />
        <button className={styles.submitButton} onClick={onSubmit}>
          Save
        </button>
        <button className={styles.submitButton} onClick={goBack}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default Form;
