import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Input from '../Input';
import Button from '../../Shared/Button';
import SharedModal from '../../Shared/Modal';
import styles from './form.module.css';
import { putActivities, postActivities } from '../../../Redux/activities/thunks';
import { useDispatch, useSelector } from 'react-redux';

const Form = () => {
  const history = useHistory();
  const { id } = useParams();
  const [activity, setActivity] = useState({
    name: '',
    description: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [typeStyle, setTypeStyle] = useState('');
  const [titleModal, setTitleModal] = useState('');
  const [bodyModal, setBodyModal] = useState('');
  const dispatch = useDispatch();

  const activities = useSelector((state) => state.activities.data.data);

  useEffect(() => {
    if (id) {
      activitiesById(id);
    }
  }, [id]);

  const activitiesById = (id) => {
    const activity = activities.find((activity) => activity._id === id);
    if (activity) {
      setActivity(activity);
    } else {
      console.error('Member not found');
    }
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    if (id) {
      try {
        const updatedActivity = { ...activity };
        delete updatedActivity._id;
        delete updatedActivity.__v;
        const data = await dispatch(putActivities(updatedActivity, id));
        setIsSuccess(true);
        setShowModal(true);
        setTypeStyle('success');
        setTitleModal('Success');
        setBodyModal(data.message);
      } catch (error) {
        setIsSuccess(false);
        setShowModal(true);
        setTypeStyle('error');
        setTitleModal('Error');
        setBodyModal(error.message);
      }
    } else {
      try {
        const newActivity = { ...activity };
        delete newActivity._id;
        delete newActivity.__v;
        const data = await dispatch(postActivities(newActivity));
        setIsSuccess(true);
        setShowModal(true);
        setTypeStyle('success');
        setTitleModal('Success');
        setBodyModal(data.message);
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

  const onChangeInput = (e) => {
    setActivity({
      ...activity,
      [e.target.name]: e.target.value
    });
  };

  const handleCancel = () => {
    history.push('/activities');
  };

  return (
    <div className={styles.container}>
      <h2>{id ? 'Update Activity' : 'Add Activity'}</h2>
      <form className={styles.formActivity}>
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
      </form>
      <div className={styles.buttonContainer}>
        <Button text={'Cancel'} type={'cancel'} clickAction={handleCancel} />
        <Button text={'Submit'} type={'submit'} clickAction={handleConfirm} />
      </div>
      <SharedModal
        data={activities}
        show={showModal}
        typeStyle={typeStyle}
        title={titleModal}
        body={bodyModal}
        isDelete={false}
        onConfirm={handleConfirm}
        closeModal={onConfirm}
      />
    </div>
  );
};

export default Form;
