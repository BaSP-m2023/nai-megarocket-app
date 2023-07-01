import React, { useEffect } from 'react';
import styles from './form.module.css';
import { useParams, useHistory } from 'react-router-dom';
import Button from 'Components/Shared/Button';
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
import Container from 'Components/Shared/Container';
import SharedForm from 'Components/Shared/Form';
import toast, { Toaster } from 'react-hot-toast';

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

  useEffect(() => {
    if (id) {
      getSubscriptionData();
    }
    dispatch(getClasses());
    dispatch(getMembers());
  }, [id]);

  const handleCancel = () => {
    history.push('/admins/subscriptions');
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

  const showErrorToast = (message) => {
    toast.error(message, {
      duration: 2500,
      position: 'top-right',
      style: {
        background: 'rgba(227, 23, 10, 0.5)'
      },
      iconTheme: {
        primary: '#0f232e',
        secondary: '#fff'
      }
    });
  };

  const addSubscription = async (data) => {
    try {
      const response = await dispatch(createSubscription(data));
      localStorage.setItem('toastMessage', response.message);
      history.push('/admins/subscriptions');
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  const editSubscription = async (data) => {
    try {
      const response = await dispatch(updateSubscription(data, id));
      localStorage.setItem('toastMessage', response.message);
      history.push('/admins/subscriptions');
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  const onSubmit = (data) => {
    id ? editSubscription(data) : addSubscription(data);
  };

  const handleReset = () => {
    reset();
  };

  const validClasses = classes.filter((item) => item.activity);

  return (
    <Container>
      <Toaster
        containerStyle={{
          margin: '10vh 0 0 0'
        }}
      />
      <SharedForm onSubmit={handleSubmit(onSubmit)}>
        <h2>{id ? 'Update subscription' : 'Create subscription'}</h2>
        <InputComponent
          inputName="classes"
          inputType="list"
          labelName="Classes"
          list={validClasses}
          listProp={'activity.name'}
          register={register}
          error={errors.classes?.message}
          testId={'admin-subscriptions-input-classes'}
        />
        <InputComponent
          inputName="member"
          inputType="list"
          labelName="Member"
          list={members}
          listProp={'firstName'}
          register={register}
          error={errors.member?.message}
          testId={'admin-subscriptions-input-members'}
        />
        <fieldset className={styles.flexButtons}>
          <Button
            text={id ? 'Update' : 'Add'}
            type={'submit'}
            info={'submit'}
            testId={'admin-subscriptions-button-submit-form'}
          />
          <div className={styles.cleanButtons}>
            <Button
              text={'Back'}
              type={'cancel'}
              clickAction={handleCancel}
              testId={'admin-subscriptions-button-back-form'}
            />
            <Button
              type={'cancel'}
              onClick={handleReset}
              info={'reset'}
              text={'Reset'}
              testId={'admin-subscriptions-button-reset-form'}
            />
          </div>
        </fieldset>
      </SharedForm>
    </Container>
  );
};

export default Form;
