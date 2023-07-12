import React, { useEffect } from 'react';
import styles from './form.module.css';
import { useParams, useHistory } from 'react-router-dom';
import Button from 'Components/Shared/Button';
import { useSelector, useDispatch } from 'react-redux';
import { getClasses } from 'Redux/classes/thunks';
import { getMembers } from 'Redux/members/thunks';
import { createSubscription, updateSubscription } from 'Redux/subscriptions/thunks';
import InputComponent from 'Components/Shared/Input';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import subscriptionValidation from 'Validations/subscriptions';
import Container from 'Components/Shared/Container';
import SharedForm from 'Components/Shared/Form';
import toast, { Toaster } from 'react-hot-toast';
import { FiArrowLeft } from 'react-icons/fi';

const Form = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useSelector((state) => state.classes.data.data || []);
  const members = useSelector((state) => state.members.data.data || []);
  const subscriptions = useSelector((state) => state.subscriptions.data);
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
    toast.remove();
    dispatch(getClasses());
    dispatch(getMembers());
    if (id) {
      getSubscriptionData();
    }
  }, [id]);

  const handleCancel = () => {
    history.push('/admins/subscriptions');
  };

  const getSubscriptionData = async () => {
    try {
      const subToUpdate = subscriptions.find((sub) => sub._id === id);
      delete subToUpdate._id;
      delete subToUpdate.__v;
      subToUpdate.classes = subToUpdate.classes._id;
      subToUpdate.member = subToUpdate.member._id;
      reset(subToUpdate);
    } catch (error) {
      showErrorToast('Oops, something went wrong.');
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

  const validClasses = classes.filter((item) => item.activity);

  return (
    <Container>
      <Toaster
        containerStyle={{
          margin: '10vh 0 0 0'
        }}
      />
      <SharedForm onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.head}>
          {' '}
          <div
            id="admin-subscriptions-form-go-back"
            className={styles.arrow}
            onClick={handleCancel}
          >
            <FiArrowLeft size={35} />
          </div>
          <h2 className={styles.formTitle}> {id ? 'Update Subscription' : 'Add Subscription'}</h2>
        </div>
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
        {id ? (
          <InputComponent
            labelName={'Active ?'}
            inputType={'isActive'}
            inputName={'isActive'}
            register={register}
            error={errors.isActive}
            testId={'admin-subscriptions-input-checkbox'}
          />
        ) : null}
        <fieldset className={styles.flexButtons}>
          <Button
            text={id ? 'Update' : 'Add'}
            type={'submit'}
            info={'submit'}
            testId={'admin-subscriptions-button-submit-form'}
          />
        </fieldset>
      </SharedForm>
    </Container>
  );
};

export default Form;
