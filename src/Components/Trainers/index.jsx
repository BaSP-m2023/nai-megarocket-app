import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './trainers.module.css';
import Table from './Table';
const Trainers = () => {
  const history = useHistory();
  const [trainers, setTrainers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const getTrainers = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainers`);
    const data = await response.json();
    setTrainers(data.data);
  };
  useEffect(() => {
    getTrainers();
  }, []);
  const modal = () => {
    const handleCloseModal = () => {
      setShowModal(false);
    };
    return (
      <div className={styles.deleteModal}>
        <p>{modalMessage}</p>
        <button onClick={handleCloseModal}>Close</button>
      </div>
    );
  };
  const deleteItem = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/trainers/${id}`, {
        method: 'DELETE'
      });
      setTrainers([...trainers.filter((trainer) => trainer._id !== id)]);
      setModalMessage('Trainer deleted successfully');
      setShowModal(true);
    } catch (error) {
      console.error('Error deleting item:', error);
      setModalMessage('Error deleting trainer');
      setShowModal(true);
    }
  };
  const handleAddTrainer = () => {
    history.push('/trainers/form');
  };
  const editItem = (id) => {
    history.push(`/trainers/form/${id}`);
  };
  return (
    <section className={styles.container}>
      <h2>Trainers</h2>
      <button className={styles.btn} onClick={handleAddTrainer}>
        Add New Trainer
      </button>
      <Table data={trainers} deleteItem={deleteItem} editItem={editItem} />
      {showModal && modal()}
    </section>
  );
};
export default Trainers;
