import { useEffect, useState } from 'react';
import Modal from './Modals';
import styles from './activities.module.css';
import Table from './Table';
import { useHistory } from 'react-router-dom';

const Activities = () => {
  const history = useHistory();

  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddErrorModal, setShowAddErrorModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEditErrorModal, setShowEditErrorModal] = useState(false);
  const [activities, setActivities] = useState([]);
  const [activityId, setActivityId] = useState();
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
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
      if (response.ok) {
        setShowModal(true);
      } else {
        setShowErrorModal(true);
        return;
      }
    } catch (error) {
      setShowErrorModal(true);
      console.error(error);
    }
  };

  const handleAddItem = () => {
    history.push('activities/form');
  };

  const handleDeleteClick = (id) => {
    setShowDeleteConfirmationModal(true);
    setActivityId(id);
  };

  const handleConfirmDelete = () => {
    deleteActivities(activityId);
    setActivities(activities.filter((activity) => activity._id !== activityId));
    setShowDeleteConfirmationModal(false);
  };

  const handleCloseModal = (modalStateSetter) => {
    modalStateSetter(false);
  };

  const handleEditItem = (id) => {
    history.push(`/activities/form/${id}`);
  };

  return (
    <section className={styles.container}>
      <h2>Activities</h2>
      <button className={styles.addButton} onClick={handleAddItem}>
        + Add new activity
      </button>
      <Modal
        title="Are you sure you want to delete this activity?"
        show={showDeleteConfirmationModal}
        closeModal={() => setShowDeleteConfirmationModal(false)}
        onConfirm={handleConfirmDelete}
      />
      <Modal
        title="The activity has been successfully deleted!"
        show={showModal}
        closeModal={() => handleCloseModal(setShowModal)}
      />
      <Modal
        title="There was an error! The activity has been not deleted."
        show={showErrorModal}
        closeModal={() => handleCloseModal(setShowErrorModal)}
      />
      <Modal
        title="The activity has been successfully created!"
        show={showAddModal}
        closeModal={() => handleCloseModal(setShowAddModal)}
      />
      <Modal
        title="There was an error! The activity has been not created."
        show={showAddErrorModal}
        closeModal={() => handleCloseModal(setShowAddErrorModal)}
      />
      <Modal
        title="The activity has been successfully updated!"
        show={showEditModal}
        closeModal={() => handleCloseModal(setShowEditModal)}
      />
      <Modal
        title="There was an error! The activity has been not updated."
        show={showEditErrorModal}
        closeModal={() => handleCloseModal(setShowEditErrorModal)}
      />
      <Table
        data={activities}
        deleteItem={handleDeleteClick}
        setShowModal={setShowModal}
        handleEditItem={handleEditItem}
      />
    </section>
  );
};

export default Activities;
