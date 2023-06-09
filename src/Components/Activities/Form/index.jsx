import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Input from '../Input';
import Button from '../../Shared/Button';
import SharedModal from '../../Shared/Modal';
import styles from './form.module.css';

const Form = () => {
  const history = useHistory();
  const { id } = useParams();

  const [activity, setActivity] = useState({
    name: '',
    description: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [typeStyle, setTypeStyle] = useState('');
  const [titleModal, setTitleModal] = useState('');
  const [bodyModal, setBodyModal] = useState('');

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
        setIsSuccess(true);
        setTypeStyle('success');
        setTitleModal(data.message);
        setBodyModal(data.data.name + ' was edited');
        setShowModal(true);
      } else {
        setIsSuccess(false);
        setTypeStyle('error');
        setTitleModal('Error');
        setBodyModal(data.message);
        setShowModal(true);
      }
    } catch (error) {
      console.error(error);
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
        setIsSuccess(true);
        setTypeStyle('success');
        setTitleModal(data.data.name + 'was added');
        setBodyModal('');
        setShowModal(true);
      } else {
        setIsSuccess(false);
        setTypeStyle('error');
        setTitleModal('Error');
        setBodyModal(data.message);
        setShowModal(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) {
      getActivityById(id);
    }
  }, []);

  const handleConfirm = () => {
    if (id) {
      editItem(activity, id);
    } else {
      addItem(activity);
    }
  };

  const onConfirm = () => {
    if (isSuccess) {
      history.push('/activities');
    } else {
      setShowModal(false);
    }
  };

  const onChangeInput = (e) => {
    setActivity({
      ...activity,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={styles.container}>
      <h2>Form</h2>
      <form className={styles.formActivities}>
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
      </form>
      <Button text={'Submit'} type={'submit'} clickAction={handleConfirm}></Button>
      <Button
        text={'Cancel'}
        type={'cancel'}
        clickAction={() => history.push('/activities')}
      ></Button>
      <SharedModal
        show={showModal}
        typeStyle={typeStyle}
        title={titleModal}
        body={bodyModal}
        isDelete={false}
        closeModal={onConfirm}
      />
    </div>
  );
};

export default Form;
