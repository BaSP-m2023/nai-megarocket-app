import { useEffect, useState } from 'react';
import Modal from './Modals';
import styles from './activities.module.css';
import Table from './Table';

const Activities = () => {
  const [showModal, setShowModal] = useState(false);
  const [activities, setActivities] = useState([]);

  const getActivities = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL + '/activities'}`);
    const { data } = await response.json();
    setActivities(data);
  };

  const deleteActivities = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL + '/activities/' + id}`, {
      method: 'DELETE'
    });
    const { data } = await response.json();
    console.log(data);
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
      <Modal
        title="The activity has been successfully deleted!"
        show={showModal}
        closeModal={closeModal}
      />
      <Table data={activities} deleteItem={deleteItem} setShowModal={setShowModal} />
      <button className={styles.addButton}> + Add new activity</button>
    </section>
  );
};

export default Activities;
