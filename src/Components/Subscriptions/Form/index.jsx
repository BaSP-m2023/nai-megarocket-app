import React, { useState, useEffect } from 'react';
import styles from './form.module.css';
import { useParams, useHistory } from 'react-router-dom';
import Button from '../../Shared/Button';
import SharedModal from '../../Shared/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { getClasses } from '../../../Redux/classes/thunks';
import { getMembers } from '../../../Redux/members/thunks';
import { createSubscription, updateSubscription } from '../../../Redux/subscriptions/thunks';

const Form = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useSelector((state) => state.classes.data.data || []);
  const members = useSelector((state) => state.members.data.data || []);
  const subscription = useSelector((state) => state.subscriptions.data);

  const [users, setUsers] = useState({
    classes: '',
    member: '',
    date: new Date()
  });
  const [showAlert, setShowAlert] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [bodyModal, setBodyModal] = useState('');

  useEffect(() => {
    if (id) {
      loadSubData();
    }
    dispatch(getClasses());
    dispatch(getMembers());
  }, [id]);
  const loadSubData = () => {
    const subToUpdate = subscription.find((sub) => sub._id === id);
    console.log(subToUpdate);
    setUsers({
      classes: subToUpdate.classes._id,
      member: subToUpdate.member._id
    });
  };
  const handleCancel = () => {
    history.push('/subscriptions');
  };

  const showSuccesModal = (data) => {
    setAlertMessage(data.msg);
    setIsSuccess(true);
    setShowAlert(true);
  };

  const showErrorModal = (error) => {
    setAlertMessage(error.msg);
    setIsSuccess(false);
    setShowAlert(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (id) {
        const data = await dispatch(updateSubscription(users, id));
        showSuccesModal({ message: 'Success' });
        setBodyModal(data.msg);
        console.log(data);
      } else {
        const newSubscription = {
          classes: users.classes,
          member: users.member,
          date: users.date
        };
        const data = await dispatch(createSubscription(newSubscription));
        showSuccesModal({ message: 'Success' });
        setBodyModal(data.message);
      }
    } catch (error) {
      showErrorModal(error);
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

  const handleCloseAlert = () => {
    if (isSuccess) {
      history.push('/subscriptions');
    } else {
      setShowAlert(false);
    }
  };

  return (
    <div className={styles.subscriptionContainer}>
      <form onSubmit={handleSubmit} className={styles['form-container']}>
        <fieldset className={styles.fieldContainer}>
          <label className={styles.labelStyle}>Classes</label>
          <select value={users.classes} onChange={onChangeClasses}>
            <option value="">Select a class</option>
            {classes.map((classItem) => (
              <option key={classItem?._id} value={classItem?._id}>
                {classItem?.activity?.name || ''}
              </option>
            ))}
          </select>
        </fieldset>
        <fieldset className={styles.fieldContainer}>
          <label className={styles.labelStyle}>Members</label>
          <select value={users.member} onChange={onChangeMember}>
            <option value="">Select a member</option>
            {Array.isArray(members) &&
              members.map((memberItem) => (
                <option key={memberItem._id} value={memberItem._id}>
                  {memberItem.firstName}
                </option>
              ))}
          </select>
        </fieldset>
        <fieldset className={styles.flexButtons}>
          <Button text={'Cancel'} type={'cancel'} clickAction={handleCancel} />
          <Button text={id ? 'Submit' : 'Confirm'} type={'submit'} />
        </fieldset>
      </form>
      {showAlert && (
        <SharedModal
          show={showAlert}
          closeModal={handleCloseAlert}
          title={isSuccess ? 'Success' : 'Something is wrong'}
          typeStyle={isSuccess ? 'success' : 'error'}
          body={bodyModal}
        >
          {alertMessage}
        </SharedModal>
      )}
    </div>
  );
};

export default Form;
