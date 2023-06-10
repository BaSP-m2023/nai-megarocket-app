import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './trainers.module.css';
import Table from '../Shared/Table/index';
import Button from '../Shared/Button/index';
import SharedModal from '../Shared/Modal';

const Trainers = () => {
  const history = useHistory();
  const [trainers, setTrainers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [selectedTrainerId, setSelectedTrainerId] = useState(null);
  const [isConfirmationModal, setIsConfirmationModal] = useState(true);
  const [typeStyle, setTypeStyle] = useState('default');

  const getTrainers = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainers`);
    const data = await response.json();
    setTrainers(data.data);
  };
  useEffect(() => {
    getTrainers();
  });

  const handleDeleteConfirmation = async () => {
    if (selectedTrainerId) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/trainers/${selectedTrainerId}`,
          {
            method: 'DELETE'
          }
        );
        const data = await response.json();
        setTrainers([...trainers.filter((trainer) => trainer._id !== selectedTrainerId)]);
        setModalMessage(data.message);
        setIsConfirmationModal(false);
        setTypeStyle('success');
      } catch (error) {
        console.error('Error deleting item:', error);
        setModalMessage('Error deleting trainer');
        setTypeStyle('error');
      }
    }
  };

  const handleDeleteCancel = () => {
    setSelectedTrainerId(null);
    setShowModal(false);
    setIsConfirmationModal(true);
  };

  const deleteItem = (id) => {
    setSelectedTrainerId(id);
    setModalMessage('Are you sure you want to delete this trainer?');
    setShowModal(true);
    setTypeStyle('default');
    setIsConfirmationModal(true);
  };

  const handleAddTrainer = () => {
    history.push('/trainers/form');
  };
  const editItem = (id) => {
    history.push(`/trainers/form/${id}`);
  };
  return (
    <section className={styles.trainerContainer}>
      <div className={styles.headContainer}>
        <h2>Trainers</h2>
        <Button text="+ Add Trainer" clickAction={handleAddTrainer} type="add" />
      </div>
      <Table
        data={trainers || []}
        properties={['firstName', 'lastName', 'phone', 'email', 'salary']}
        columnTitles={['First Name', 'Last Name', 'Phone Number', 'Email', 'Salary']}
        handleUpdateItem={editItem}
        handleDeleteItem={deleteItem}
      />
      {showModal && (
        <SharedModal
          show={showModal}
          title="Delete Trainer"
          body={modalMessage}
          isDelete={isConfirmationModal}
          typeStyle={typeStyle}
          closeModal={handleDeleteCancel}
          onConfirm={handleDeleteConfirmation}
        />
      )}
    </section>
  );
};
export default Trainers;
