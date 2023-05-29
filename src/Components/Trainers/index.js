import styles from './trainers.module.css';
import Table from './Table';
import { useEffect, useState } from 'react';

const Trainers = () => {
  const [trainers, setTrainers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteModalMessage, setDeleteModalMessage] = useState('');

  const getTrainers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/trainers`);
      const data = await response.json();
      setTrainers(data.data);
    } catch (error) {
      setDeleteModalMessage('Error occurred while retrieving the trainers');
      setShowDeleteModal(true);
    }
  };
  useEffect(() => {
    getTrainers();
  }, []);
  const DeleteModal = () => {
    const handleCloseModal = () => {
      setShowDeleteModal(false);
    };
    return (
      <div className={styles.deleteModal}>
        <p>{deleteModalMessage}</p>
        <button onClick={handleCloseModal}>Close</button>
      </div>
    );
  };

  const deleteItem = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL + '/trainers/' + id}`, {
        method: 'DELETE'
      });
      setTrainers([...trainers.filter((trainer) => trainer._id !== id)]);
      setDeleteModalMessage('Trainer deleted successfully');
      setShowDeleteModal(true);
    } catch (error) {
      console.error('Error deleting item:', error);
      setDeleteModalMessage('Error deleting trainer');
      setShowDeleteModal(true);
    }
  };

  return (
    <section className={styles.container}>
      <h2>Trainers</h2>
      <Table data={trainers} deleteItem={deleteItem} />
      {showDeleteModal && <DeleteModal />}
      <button className={styles.btn}>+ Add new Trainer</button>
    </section>
  );
};

export default Trainers;
