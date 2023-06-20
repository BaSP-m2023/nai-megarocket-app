import React, { useState, useEffect } from 'react';
import styles from './form.module.css';
import { useParams, useHistory } from 'react-router-dom';
import Button from 'Components/Shared/Button';
import SharedModal from 'Components/Shared/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { getClasses } from 'Redux/classes/thunks';
import { getMembers } from 'Redux/members/thunks';
import {
  createSubscription,
  updateSubscription,
  getSubscriptionById
} from 'Redux/subscriptions/thunks';
import InputComponent from 'Components/Shared/Input';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import subscriptionValidation from 'Validations/subscriptions';
const Form = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useSelector((state) => state.classes.data.data || []);
  const members = useSelector((state) => state.members.data.data || []);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'all',
    resolver: joiResolver(subscriptionValidation),
    defaultValues: {
      classes: '',
      member: '',
      date: new Date()
    }
  });
  const [showAlert, setShowAlert] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    if (id) {
      getSubscriptionData();
    }
    dispatch(getClasses());
    dispatch(getMembers());
  }, [id]);

  const handleCancel = () => {
    history.push('/admin/subscriptions');
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
  const getSubscriptionData = async () => {
    try {
      const response = await dispatch(getSubscriptionById(id));
      const subscriptionData = response.data;
      delete subscriptionData._id;
      delete subscriptionData.createdAt;
      delete subscriptionData.updatedAt;
      delete subscriptionData.__v;
      subscriptionData.classes = subscriptionData.classes._id;
      subscriptionData.member = subscriptionData.member._id;
      reset(subscriptionData);
    } catch (error) {
      console.log(error);
    }
  };
  const addSubscription = async (data) => {
    try {
      const response = await dispatch(createSubscription(data));
      showSuccesModal(response);
    } catch (error) {
      showErrorModal(error);
    }
  };
  const editSubscription = async (data) => {
    try {
      const response = await dispatch(updateSubscription(data, id));
      showSuccesModal(response);
    } catch (error) {
      showErrorModal(error);
    }
  };
  const onSubmit = (data) => {
    console.log(data);
    id ? editSubscription(data) : addSubscription(data);
  };
  const handleCloseAlert = () => {
    if (isSuccess) {
      history.push('/admin/subscriptions');
    } else {
      setShowAlert(false);
    }
  };

  const handleReset = () => {
    reset();
  };

  return (
    <div className={styles.subscriptionContainer}>
      <h2>{id ? 'Update subscription' : 'Create subscription'}</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <InputComponent
          inputName="classes"
          inputType="list"
          labelName="Classes"
          list={classes}
          listProp={'activity.name'}
          register={register}
          error={errors.classes?.message}
        />
        <InputComponent
          inputName="member"
          inputType="list"
          labelName="Member"
          list={members}
          listProp={'firstName'}
          register={register}
          error={errors.member?.message}
        />
        <fieldset className={styles.flexButtons}>
          <Button text={id ? 'Update' : 'Add'} type={'submit'} info={'submit'} />
          <div className={styles.cleanButtons}>
            <Button text={'Back'} type={'cancel'} clickAction={handleCancel} />
            <Button type={'cancel'} onClick={handleReset} info={'reset'} text={'Reset'} />
          </div>
        </fieldset>
      </form>
      {showAlert && (
        <SharedModal
          show={showAlert}
          closeModal={handleCloseAlert}
          title={isSuccess ? 'Success' : 'Something is wrong'}
          typeStyle={isSuccess ? 'success' : 'error'}
          body={alertMessage}
        />
      )}
    </div>
  );
};

export default Form;
