import React, { useState, useEffect } from 'react';
import styles from './form.module.css';
import { useParams, useHistory } from 'react-router-dom';
import Button from '../../Shared/Button';
import SharedModal from '../../Shared/Modal';

const Form = () => {
  const { id } = useParams();
  const history = useHistory();
  const [classes, setClasses] = useState([]);
  const [members, setMembers] = useState([]);
  const [subscription, setsubscription] = useState([]);
  const [users, setUsers] = useState({
    classes: '',
    member: '',
    date: new Date()
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  useEffect(() => {
    if (id) {
      getsubscriptionById(id);
    }
    getClasses();
    getMembers();
  }, [id]);

  const getsubscriptionById = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions/${id}`, {
        method: 'GET'
      });
      if (!response.ok) {
        throw new Error('Failed to get subscription');
      }
      const { data } = await response.json();
      setsubscription(data);
      setUsers({
        classes: data.classes?._id || '',
        member: data.member?._id || '',
        date: new Date(data.date) || new Date()
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getClasses = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/classes`);
      if (!response.ok) {
        throw new Error('Failed to get classes');
      }
      const { data } = await response.json();
      setClasses(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getMembers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/members`);
      if (!response.ok) {
        throw new Error('Failed to get members');
      }
      const { data } = await response.json();
      setMembers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const addSubscription = async ({ member: newMember, classes }) => {
    const newSubscription = {
      classes,
      member: newMember,
      date: new Date()
    };
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSubscription)
      });
      const { data } = await response.json();
      if (!response.ok) {
        setAlertMessage('Failed to add subscription');
        setShowAlert(true);
      } else {
        setAlertMessage('Subscription created!');
        setShowSuccessAlert(true);
        setsubscription([...subscription, data]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateSubscription = async (subscription, id) => {
    try {
      if (!subscription) {
        throw new Error('Invalid subscription ID');
      }
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(users)
      });
      const data = await response.json();
      if (response.ok) {
        setAlertMessage('Subscription updated!');
        setShowSuccessAlert(true);
      } else if (!response.ok) {
        setAlertMessage(data.message);
        setShowSuccessAlert(true);
      }
    } catch (error) {
      alert(error);
    }
  };

  const onChangeClasses = (e) => {
    setUsers((prevState) => ({
      ...prevState,
      classes: e.target.value
    }));
  };

  const onChangeMember = (e) => {
    setUsers((prevState) => ({
      ...prevState,
      member: e.target.value
    }));
  };

  const handleCancel = () => {
    if (showSuccessAlert) {
      setShowAlert(false);
    }
    setShowAlert(false);
    history.push('/subscriptions');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (id) {
      updateSubscription(users, id);
    } else {
      const newSubscription = {
        classes: users.classes,
        member: users.member,
        date: users.date
      };
      addSubscription(newSubscription);
    }
  };
  const handleExitAlert = () => {
    setShowAlert(false);
    setShowSuccessAlert(false);
  };

  return (
    <>
      <SharedModal
        isDelete={false}
        show={showAlert}
        closeModal={handleExitAlert}
        title={'Something is wrong'}
        body={alertMessage}
      />
      <SharedModal
        isDelete={false}
        show={showSuccessAlert}
        closeModal={handleCancel}
        title={'Success'}
        body={alertMessage}
      />
      <h2>Form</h2>
      <form onSubmit={handleSubmit} className={styles['form-container']}>
        <fieldset>
          <label>Classes</label>
          <select value={users.classes} onChange={onChangeClasses}>
            <option value="">Select a class</option>
            {classes.map((classItem) => (
              <option key={classItem?._id} value={classItem?._id}>
                {classItem?.activity?.name || ''}
              </option>
            ))}
          </select>
        </fieldset>
        <fieldset>
          <label>Members</label>
          <select value={users.member} onChange={onChangeMember}>
            <option value="">Select a member</option>
            {members.map((memberItem) => (
              <option key={memberItem?._id} value={memberItem?._id}>
                {memberItem?.firstName}
              </option>
            ))}
          </select>
        </fieldset>
        <fieldset className={styles.flex_buttons}>
          <Button text={'Cancel'} type={'cancel'} clickAction={handleCancel} />
          <Button text={id ? 'Submit' : 'Confirm'} type={'submit'} clickAction={handleSubmit} />
        </fieldset>
      </form>
    </>
  );
};

export default Form;
