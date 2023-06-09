import { useState, useEffect } from 'react';
import styles from './classes.module.css';
import Table from '../Shared/Table';
import Button from '../Shared/Button';
import SharedModal from '../Shared/Modal';
import { useHistory } from 'react-router-dom';

const Classes = () => {
  const history = useHistory();
  const [classes, setClasses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // const flagForm = () => {
  //   history.push('/classes/form');
  // };

  const getClasses = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/classes`);
    const data = await response.json();
    setClasses(data.data);
  };
  useEffect(() => {
    getClasses();
  });

  const closeModal = () => {
    setShowModal(false);
  };

  const deleteItem = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/classes/${id}`, {
        method: 'DELETE'
      });
      setClasses([...classes.filter((classes) => classes._id !== id)]);
      setModalMessage('Class deleted successfully');
      setShowModal(true);
    } catch (error) {
      console.error('Error deleting item:', error);
      setModalMessage('Error deleting classes');
      setShowModal(true);
    }
  };

  const editItem = (id) => {
    history.push(`/classes/form/${id}`);
  };

  const handleAddClass = () => {
    history.push('/classes/form');
  };

  return (
    <section className={styles.container}>
      <>
        <h2>Classes</h2>
        <Button clickAction={handleAddClass} text="Add New" type="add" />
        {classes && classes.length > 0 ? (
          <Table data={classes} deleteItem={deleteItem} editItem={editItem} />
        ) : classes === undefined ? (
          <p>Loading...</p>
        ) : (
          <p>No classes found.</p>
        )}
        {showModal && <SharedModal message={modalMessage} onClose={closeModal} />}
      </>
    </section>
  );
};

export default Classes;
