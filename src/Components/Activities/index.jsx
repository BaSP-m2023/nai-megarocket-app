import { useEffect, useState } from 'react';
import SharedModal from '../Shared/Modal';
import Table from '../Shared/Table';
import Button from '../Shared/Button';
import styles from './activities.module.css';
import { useHistory } from 'react-router-dom';

const Activities = () => {
  const history = useHistory();

  const [activities, setActivities] = useState([]);
  const [activityId, setActivityId] = useState();
  const [showModal, setShowModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [typeStyle, setTypeStyle] = useState('');
  const [titleModal, setTitleModal] = useState('');
  const [bodyModal, setBodyModal] = useState('');

  useEffect(() => {
    getActivities();
  }, []);

  const getActivities = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activities`);
      const { data } = await response.json();
      setActivities(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteActivities = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (response.ok) {
        setIsDelete(false);
        setTypeStyle('success');
        setTitleModal(data.message);
        setBodyModal('');
        setShowModal(true);
      } else {
        setIsDelete(false);
        setTypeStyle('error');
        setTitleModal('Error');
        setBodyModal('');
        setShowModal(true);
      }
    } catch (error) {
      console.error(error);
      setIsDelete(false);
      setTypeStyle('error');
      setBodyModal('Error to delete an activity');
      setTitleModal('Error');
      setShowModal(true);
    }
  };

  const handleAddItem = () => {
    history.push('activities/form');
  };

  const handleDeleteClick = (id) => {
    setActivityId(id);
    setIsDelete(true);
    setTypeStyle();
    setTitleModal('Do you want to delete this activity?');
    setBodyModal('');
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    deleteActivities(activityId);
    setActivities(activities.filter((activity) => activity._id !== activityId));
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleEditItem = (id) => {
    history.push(`/activities/form/${id}`);
  };

  return (
    <section className={styles.containerActivity}>
      <h2>Activities</h2>
      <Button text={'+ Add Activity'} type={'add'} clickAction={handleAddItem}></Button>
      {activities.length !== 0 ? (
        <>
          <Table
            data={activities}
            properties={['name', 'description']}
            columnTitles={['Name', 'Description']}
            handleUpdateItem={handleEditItem}
            handleDeleteItem={handleDeleteClick}
          />
          {showModal && (
            <SharedModal
              show={showModal}
              typeStyle={typeStyle}
              title={titleModal}
              body={bodyModal}
              isDelete={isDelete}
              onConfirm={handleConfirmDelete}
              closeModal={handleCloseModal}
            />
          )}
        </>
      ) : (
        <h3>There are no activities in the database</h3>
      )}
    </section>
  );
};

export default Activities;
