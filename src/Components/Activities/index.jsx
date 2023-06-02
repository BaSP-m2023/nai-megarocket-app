import { useEffect, useState } from 'react';
import Modal from './Modals';
import styles from './activities.module.css';
import Table from './Table';

const Activities = () => {
  const [showModal, setShowModal] = useState(false);
  const [activities, setActivities] = useState([]);

  const getActivities = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL + '/api/activities'}`);
      const { data } = await response.json();
      setActivities(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteActivities = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL + '/api/activities/' + id}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getActivities();
  }, []);

  const deleteItem = (id) => {
    deleteActivities(id);
    setActivities(activities.filter((activity) => activity._id !== id));
  };

  const closeModal = () => {
    setShowModal(false);
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
      <Table data={activities} deleteItem={deleteItem} setShowModal={setShowModal} />
    </section>
  );
};

export default Activities;
