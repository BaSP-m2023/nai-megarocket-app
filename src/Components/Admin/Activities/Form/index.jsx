import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import InputComponent from 'Components/Shared/Input';
import Button from 'Components/Shared/Button';
import styles from './form.module.css';
import { putActivities, postActivities } from 'Redux/activities/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import activityValidation from 'Validations/activities';
import { joiResolver } from '@hookform/resolvers/joi';
import Container from 'Components/Shared/Container';
import SharedForm from 'Components/Shared/Form';
import toast, { Toaster } from 'react-hot-toast';

const Form = () => {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities.data.data);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'all',
    resolver: joiResolver(activityValidation)
  });

  const getActivityData = async () => {
    try {
      const activityData = activities.find((activity) => activity._id === id);
      delete activityData._id;
      delete activityData.__v;
      reset(activityData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) {
      getActivityData();
    }
  }, []);

  const onSubmit = async (data) => {
    if (id) {
      try {
        const response = await dispatch(putActivities(data, id));
        localStorage.setItem('toastMessage', response.message);
        history.push('/admins/activities');
      } catch (error) {
        showErrorToast(error.message);
      }
    } else {
      try {
        const response = await dispatch(postActivities(data));
        localStorage.setItem('toastMessage', response.message);
        history.push('/admins/activities');
      } catch (error) {
        showErrorToast(error.message);
      }
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

  const handleCancel = () => {
    history.push('/admins/activities');
  };

  return (
    <Container>
      <Toaster
        containerStyle={{
          margin: '10vh 0 0 0'
        }}
      />
      <SharedForm onSubmit={handleSubmit(onSubmit)}>
        <h2>{id ? 'Update Activity' : 'Add Activity'}</h2>
        <InputComponent
          register={register}
          inputName="name"
          inputType="text"
          labelName="Activity"
          placeholder="Activity"
          error={errors.name?.message}
          testId={'admin-activity-input-name'}
        />
        <InputComponent
          register={register}
          inputName="description"
          inputType="text"
          labelName="Description"
          placeholder="Description"
          error={errors.description?.message}
          testId={'admin-activity-input-description'}
        />
        <InputComponent
          register={register}
          labelName={'Active ?'}
          inputType={'isActive'}
          inputName={'isActive'}
          error={errors.isActive}
          testId={'admin-activity-input-checkbox'}
        />
        <div className={styles.buttonContainer}>
          <Button
            text={id ? 'Update' : 'Add'}
            type={'submit'}
            info={'submit'}
            testId={'admin-activity-button-submit-form'}
          />
        </div>
        <div className={styles.buttons}>
          <Button
            text={'Back'}
            type={'cancel'}
            clickAction={handleCancel}
            testId={'admin-activity-button-back-form'}
          />
          <Button
            type={'cancel'}
            clickAction={() => reset()}
            text={'Reset'}
            info={'reset'}
            testId={'admin-activity-button-reset-form'}
          />
        </div>
      </SharedForm>
    </Container>
  );
};

export default Form;
