import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Input from '../Input';
import Button from '../../Shared/Button';
import SharedModal from '../../Shared/Modal';
import styles from './form.module.css';
import { getActivitiesById, putActivities, postActivities } from '../../../Redux/activities/thunks';
import { useDispatch } from 'react-redux';

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

  useEffect(() => {
    dispatch(getActivitiesById());
  }, []);

  // useEffect(() => {
  //   if (id) {
  //     getActivitiesById(id);
  //   }
  // }, []);

  const handleConfirm = () => {
    if (id) {
      putActivities(activity, id);
    } else {
      postActivities(activity);
    }
  };

  const onConfirm = () => {
    if (isSuccess) {
      history.push('/activities');
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
        <Button
          text={'Cancel'}
          type={'cancel'}
          clickAction={() => history.push('/activities')}
        ></Button>
        <Button text={'Submit'} type={'submit'} clickAction={handleConfirm}></Button>
      </div>
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
