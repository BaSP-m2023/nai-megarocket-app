import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import InputComponent from '../../Shared/Input';
import Button from '../../Shared/Button';
import SharedModal from '../../Shared/Modal';
import styles from './form.module.css';
import { putActivities, postActivities, getActivitiesById } from '../../../Redux/activities/thunks';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import activityValidation from '../../../validations/activities';
import { joiResolver } from '@hookform/resolvers/joi';

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
    mode: 'onBlur',
    resolver: joiResolver(activityValidation)
  });

  const getActivityData = async () => {
    try {
      const response = await dispatch(getActivitiesById(id));
      const activityData = response.data;
      console.log(activityData);
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
      history.push('/activities');
      setIsSuccess(true);
    } else {
      setShowModal(false);
    }
  };

  const handleCancel = () => {
    history.push('/activities');
  };

  return (
    <div className={styles.container}>
      <h2>{id ? 'Update Activity' : 'Add Activity'}</h2>
      <form className={styles.formActivity} onSubmit={handleSubmit(onSubmit)}>
        <InputComponent
          register={register}
          inputName="name"
          inputType="text"
          labelName="Activity"
          placeholder="Activity"
          error={errors.name?.message}
        />
        <InputComponent
          register={register}
          inputName="description"
          inputType="text"
          labelName="Description"
          placeholder="Description"
          error={errors.description?.message}
        />
        <div className={styles.buttonContainer}>
          <div className={styles.buttons}>
            <Button text={'Cancel'} type={'cancel'} clickAction={handleCancel} />
            <Button text={'Submit'} type={'submit'} info={'submit'} />
          </div>
        </div>
        <Button type={'cancel'} clickAction={() => reset()} text={'Reset'} info={'reset'} />
      </form>
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
