import { useEffect, useState } from 'react';
import Modal from './Modals';
import styles from './activities.module.css';
import Table from './Table';
import Form from './Form';

const Activities = () => {
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddErrorModal, setShowAddErrorModal] = useState(false);
  const [activities, setActivities] = useState([]);

  const getActivities = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL + '/activities'}`);
      const { data } = await response.json();
      setActivities(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteActivities = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL + '/activities/' + id}`, {
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

  const editActivities = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL + '/activities/' + id}`, {
        method: 'PUT'
      });
    } catch (error) {
      console.error(error);
    }
  };

  const addActivities = async (activity) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL + '/activities'}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(activity)
      });
      if (response.ok) {
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

  useEffect(() => {
    getActivities();
  }, []);

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

  const editItem = (id) => {
    editActivities(id);
    setActivities(...activities);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeErrorModal = () => {
    setShowErrorModal(false);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
  };

  const closeAddErrorModal = () => {
    setShowAddErrorModal(false);
  };

  return (
    <section className={styles.container}>
      <h2>Activities</h2>
      <button className={styles.addButton}> + Add new activity</button>
      <Modal
        title="The activity has been successfully deleted!"
        show={showModal}
        closeModal={closeModal}
      />
      <Modal
        title="There was an error, the activity has been not deleted!"
        show={showErrorModal}
        closeModal={closeErrorModal}
      />
      <Modal
        title="The activity has been created!"
        show={showAddModal}
        closeModal={closeAddModal}
      />
      <Modal
        title="There was an error, the activity has been not created!"
        show={showAddErrorModal}
        closeModal={closeAddErrorModal}
      />
      <Table
        data={activities}
        deleteItem={deleteItem}
        editItem={editItem}
        setShowModal={setShowModal}
      />
      <Form addItem={addItem} setShowAddModal={setShowAddModal} />
    </section>
  );
};

export default Activities;
