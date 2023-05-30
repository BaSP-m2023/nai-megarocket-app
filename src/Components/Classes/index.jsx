import { useState, useEffect } from 'react';
// import Modal from './Modal';
import styles from './classes.module.css';
import Table from './Table';
import ClassesForm from './Form';

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [selectedClasses, setSelectedClasses] = useState(null);

  const flagForm = () => {
    setShowForm(!showForm);
  };
  //
  const getClasses = async () => {
    const response = await fetch(process.env.REACT_APP_API_URL + '/classes');
    const data = await response.json();
    setClasses(data.data);
  };
  //
  useEffect(() => {
    getClasses();
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
      await fetch(process.env.REACT_APP_API_URL + `/classes/${id}`, {
        method: 'DELETE'
      });
      setClasses([...classes.filter((classes) => classes._id !== id)]);
      setModalMessage('classes deleted successfully');
      setShowModal(true);
    } catch (error) {
      console.error('Error deleting item:', error);
      setModalMessage('Error deleting classes');
      setShowModal(true);
    }
  };

  const editItem = (id) => {
    setEditMode(true);
    const classe = classes.find((classe) => classe._id === id);
    setSelectedClasses(classe);
    setShowForm(true);
  };

  const handleSubmit = async (formData) => {
    try {
      if (editMode) {
        try {
          await fetch(process.env.REACT_APP_API_URL + `/classes/${selectedClasses._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
          setModalMessage('class edited successfully');
          setShowModal(true);
          getClasses();
        } catch (error) {
          console.error('Error edited class:', error);
          setModalMessage('Error edited class');
          setShowModal(true);
        }
      } else {
        try {
          await fetch(process.env.REACT_APP_API_URL + '/classes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
          setModalMessage('Trainer added successfully');
          setShowModal(true);
          getClasses();
        } catch (error) {
          console.error('Error adding class:', error);
          setModalMessage('Error adding class');
          setShowModal(true);
        }
      }
      setShowForm(false);
      setEditMode(false);
      setSelectedClasses(null);
    } catch (error) {
      console.error('Error adding/updating class:', error);
      setModalMessage('Error adding/updating class');
      setShowModal(true);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditMode(false);
    setSelectedClasses(null);
  };

  return (
    <section className={styles.container}>
      {showForm ? (
        <>
          {editMode ? <h2>Edit Class</h2> : <h2>Add New Class</h2>}
          <ClassesForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            editMode={editMode}
            classe={selectedClasses}
          />
        </>
      ) : (
        <>
          <h2>Classes</h2>
          <button className={styles.btn} onClick={flagForm}>
            Add New Class
          </button>
          <Table data={classes} deleteItem={deleteItem} editItem={editItem} />
          {showModal && modal()}
        </>
      )}
    </section>
  );
};

export default Classes;
