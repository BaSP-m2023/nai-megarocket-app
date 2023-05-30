import { useEffect, useState } from 'react';
import styles from './trainers.module.css';
import Table from './Table';
import TrainerForm from './Form';

const Trainers = () => {
  const [trainers, setTrainers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  const getTrainers = async () => {
    const response = await fetch(process.env.REACT_APP_API_URL + '/trainers');
    const data = await response.json();
    setTrainers(data.data);
  };
  const flagForm = () => {
    setShowForm(!showForm);
    setEditMode(false);
    setSelectedTrainer(null);
  };
  useEffect(() => {
    getTrainers();
  }, []);
  const deleteModal = () => {
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
      await fetch(process.env.REACT_APP_API_URL + `/trainers/${id}`, {
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

  const editItem = (id) => {
    setEditMode(true);
    const trainer = trainers.find((trainer) => trainer._id === id);
    setSelectedTrainer(trainer);
    setShowForm(true);
  };

  const handleSubmit = async (formData) => {
    try {
      if (editMode) {
        try {
          await fetch(process.env.REACT_APP_API_URL + `/trainers/${selectedTrainer._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
          setModalMessage('Trainer edited successfully');
          setShowModal(true);
          getTrainers();
        } catch (error) {
          console.error('Error edited trainer:', error);
          setModalMessage('Error edited trainer');
          setShowModal(true);
        }
      } else {
        try {
          await fetch(process.env.REACT_APP_API_URL + '/trainers', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
          setModalMessage('Trainer added successfully');
          setShowModal(true);
          getTrainers();
        } catch (error) {
          console.error('Error adding trainer:', error);
          setModalMessage('Error adding trainer');
          setShowModal(true);
        }
      }
      setShowForm(false);
      setEditMode(false);
      setSelectedTrainer(null);
    } catch (error) {
      console.error('Error adding/updating trainer:', error);
      setModalMessage('Error adding/updating trainer');
      setShowModal(true);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditMode(false);
    setSelectedTrainer(null);
  };

  return (
    <section className={styles.container}>
      {showForm ? (
        <>
          {editMode ? <h2>Edit Trainer</h2> : <h2>Add New Trainer</h2>}
          <TrainerForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            editMode={editMode}
            trainer={selectedTrainer}
          />
        </>
      ) : (
        <>
          <h2>Trainers</h2>
          <button className={styles.btn} onClick={flagForm}>
            Add New Trainer
          </button>
          <Table data={trainers} deleteItem={deleteItem} editItem={editItem} />
          {showModal && deleteModal()}
        </>
      )}
    </section>
  );
};

export default Trainers;
