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
  const [isDelete, setIsDelete] = useState(false);
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
        setIsDelete(false);
        setTypeStyle('success');
        setTitleModal(data.message);
        setBodyModal(data.data.name + 'was edited');
        setShowModal(true);
        setTimeout(() => {
          goBack();
        }, 2000);
      } else {
        setIsDelete(false);
        setTypeStyle('error');
        setTitleModal('Error');
        setBodyModal(data.message);
        setShowModal(true);
      }
    } catch (error) {
      console.error(error);
      setIsDelete(false);
      setTypeStyle('error');
      setBodyModal('Error to edit an activity');
      setTitleModal('Error');
      setShowModal(true);
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
        setIsDelete(false);
        setTypeStyle('success');
        setTitleModal(data.data.name + 'was added');
        setBodyModal('');
        setShowModal(true);
        setActivity({
          name: '',
          description: ''
        });
        setTimeout(() => {
          goBack();
        }, 2000);
      } else {
        setIsDelete(false);
        setTypeStyle('error');
        setTitleModal('Error');
        setBodyModal(data.message);
        setShowModal(true);
      }
    } catch (error) {
      console.error(error);
      setIsDelete(false);
      setTypeStyle('error');
      setBodyModal('Error to add an activity');
      setTitleModal('Error');
      setShowModal(true);
    }
  };

  useEffect(() => {
    if (id) {
      getActivityById(id);
    }
  }, []);

  const onSubmit = () => {
    if (id) {
      editItem(activity, id);
    } else {
      addItem(activity);
    }
  };

  const handleConfirmClick = (e) => {
    e.preventDefault();
    setIsDelete(true);
    setTypeStyle();
    id
      ? setTitleModal('Do you want to edit this activity?')
      : setTitleModal('Do you want to add this activity?');
    setBodyModal('');
    setShowModal(true);
  };

  const handleConfirm = () => {
    onSubmit();
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const goBack = () => {
    history.push(`/activities`);
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
        <Button text={'Submit'} type={'submit'} clickAction={handleConfirmClick}></Button>
        <Button text={'Cancel'} type={'cancel'} clickAction={goBack}></Button>
      </form>
      <SharedModal
        show={showModal}
        typeStyle={typeStyle}
        title={titleModal}
        body={bodyModal}
        isDelete={isDelete}
        onConfirm={handleConfirm}
        closeModal={handleCloseModal}
      />
    </div>
  );
};

export default Form;
