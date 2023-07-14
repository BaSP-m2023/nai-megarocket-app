import React, { useEffect } from 'react';
import styles from './form.module.css';
import { useParams, useHistory } from 'react-router-dom';
import Button from 'Components/Shared/Button';
import { useSelector, useDispatch } from 'react-redux';
import { getClasses } from 'Redux/classes/thunks';
import { getMembers } from 'Redux/members/thunks';
import { createSubscription, updateSubscription } from 'Redux/subscriptions/thunks';
import InputComponent from 'Components/Shared/Input';
import { Controller, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import subscriptionValidation from 'Validations/subscriptions';
import Container from 'Components/Shared/Container';
import SharedForm from 'Components/Shared/Form';
import toast, { Toaster } from 'react-hot-toast';
import { FiArrowLeft } from 'react-icons/fi';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { FormControl, InputLabel } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';

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
    control,
    watch,
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
        <FormControl variant="standard" fullWidth error={errors.classes?.message}>
          <InputLabel id="classes-label">Classes</InputLabel>
          <Controller
            control={control}
            name="classes"
            render={({ field }) => (
              <Select
                {...field}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                id={'admin-subscriptions-input-classes'}
                MenuProps={{
                  sx: { height: '400px' }
                }}
              >
                {validClasses?.map((classes) =>
                  classes.trainer ? (
                    <MenuItem key={classes?._id} value={classes?._id}>
                      {classes.activity?.name +
                        ' | ' +
                        classes.hour +
                        ' | ' +
                        classes.day +
                        ' | ' +
                        classes.trainer?.firstName +
                        ' ' +
                        classes.trainer?.lastName}
                    </MenuItem>
                  ) : null
                )}
              </Select>
            )}
          />
          <FormHelperText>{errors.classes?.message}</FormHelperText>
        </FormControl>
        <FormControl variant="standard" fullWidth error={errors.member?.message}>
          <InputLabel id="day-label">Member</InputLabel>
          <Controller
            control={control}
            name="member"
            render={({ field }) => (
              <Select
                {...field}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                id={'admin-subscriptions-input-members'}
              >
                {members?.map((member) => (
                  <MenuItem key={member?._id} value={member?._id}>
                    {member?.firstName + ' ' + member?.lastName}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <FormHelperText>{errors.member?.message}</FormHelperText>
        </FormControl>
        {id ? (
          <InputComponent
            register={register}
            labelName={'Active ?'}
            inputType={'isActive'}
            inputName={'isActive'}
            value={watch('isActive')}
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
