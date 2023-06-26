import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import InputComponent from 'Components/Shared/Input';
import Button from 'Components/Shared/Button';
import SharedModal from 'Components/Shared/Modal';
import styles from './form.module.css';
import { putActivities, postActivities, getActivitiesById } from 'Redux/activities/thunks';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import activityValidation from 'Validations/activities';
import { joiResolver } from '@hookform/resolvers/joi';
import Container from 'Components/Shared/Container';
import SharedForm from 'Components/Shared/Form';

const Form = () => {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [typeStyle, setTypeStyle] = useState('');
  const [titleModal, setTitleModal] = useState('');
  const [bodyModal, setBodyModal] = useState('');

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
      const response = await dispatch(getActivitiesById(id));
      const activityData = response.data;
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
        setIsSuccess(true);
        setShowModal(true);
        setTypeStyle('success');
        setTitleModal('Success');
        setBodyModal(response.message);
      } catch (error) {
        setIsSuccess(false);
        setShowModal(true);
        setTypeStyle('error');
        setTitleModal('Error');
        setBodyModal(error.message);
      }
    } else {
      try {
        const response = await dispatch(postActivities(data));
        setIsSuccess(true);
        setShowModal(true);
        setTypeStyle('success');
        setTitleModal('Success');
        setBodyModal(response.message);
      } catch (error) {
        setIsSuccess(false);
        setShowModal(true);
        setTypeStyle('error');
        setTitleModal('error');
        setBodyModal(error.message);
      }
    }
  };

  const onConfirm = () => {
    if (isSuccess) {
      history.push('/admin/activities');
      setIsSuccess(true);
    } else {
      setShowModal(false);
    }
  };

  const handleCancel = () => {
    history.push('/admin/activities');
  };

  return (
    <Container>
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
      <SharedModal
        show={showModal}
        typeStyle={typeStyle}
        title={titleModal}
        body={bodyModal}
        isDelete={false}
        closeModal={onConfirm}
        testId={'admin-activities-form-modal'}
        confirmDeleteTestId={'admin-activities-form-button-confirm-modal'}
      />
    </Container>
  );
};

export default Form;
