import { useEffect, useState } from 'react';
import Modal from './Modals';
import styles from './activities.module.css';
import Table from './Table';
import Form from './Form';

const Activities = () => {
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddErrorModal, setShowAddErrorModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEditErrorModal, setShowEditErrorModal] = useState(false);
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [activityId, setActivityId] = useState();

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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activities${id}`, {
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

  const editItem = async (activity, id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activities/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(activity)
      });
      const data = await response.json();
      if (response.ok) {
        setShowEditModal(true);
        const newActivity = data;
        const updatedActivities = activities.map((item) => {
          if (item._id === newActivity.data._id) {
            return newActivity.data;
          }
          return item;
        });
        setActivities(updatedActivities);
        setSelectedActivity(null);
        setShowEditForm(false);
      } else {
        setShowEditErrorModal(true);
        return;
      }
    } catch (error) {
      setShowEditErrorModal(true);
      console.error(error);
      throw error;
    }
  };

  const addActivities = async (activity) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/activities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(activity)
      });
      if (response.ok) {
        getActivities();
        setShowAddModal(true);
        const newActivity = await response.json();
        return newActivity.data;
      } else {
        setActivities(activities);
        setShowAddErrorModal(true);
      }
    } catch (error) {
      console.error(error);
      setShowAddErrorModal(true);
      throw error;
    }
  };

  const addItem = ({ name, description }) => {
    const newItem = {
      name,
      description
    };
    addActivities(newItem);
    setActivities([...activities, newItem]);
  };

  const deleteItem = (id) => {
    deleteActivities(id);
    setActivities(activities.filter((activity) => activity._id !== id));
  };

  const handleCloseModal = (modalStateSetter) => {
    modalStateSetter(false);
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleEditItem = (activity, id) => {
    setSelectedActivity(activity);
    setShowEditForm(true);
    setActivityId(id);
  };

  return (
    <section className={styles.container}>
      <h2>Activities</h2>
      <button className={styles.addButton} onClick={handleShowForm}>
        + Add new activity
      </button>
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
        deleteItem={deleteItem}
        setShowModal={setShowModal}
        handleShowForm={handleShowForm}
        handleEditItem={handleEditItem}
        editItem={editItem}
      />
      <Form
        addItem={addItem}
        setShowAddModal={setShowAddModal}
        showForm={showForm || showEditForm}
        activityToEdit={selectedActivity}
        editItem={editItem}
        activityId={activityId}
      />
    </section>
  );
};

export default Activities;
