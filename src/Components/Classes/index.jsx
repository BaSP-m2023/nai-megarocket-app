import { useState, useEffect } from 'react';
import Modal from './Modal';
import styles from './classes.module.css';
import Table from './Table';

const Classes = () => {
  const [showModal, setShowModal] = useState(false);
  const [classes, setClasses] = useState([]);

  const getClasses = async () => {
    try {
      const response = await fetch(` ${process.env.REACT_APP_API_URL + '/classes'}`);
      const { data } = await response.json();
      console.log(data);
      setClasses(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteClasses = async (id) => {
    try {
      await fetch(` ${process.env.REACT_APP_API_URL + '/classes/' + id}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getClasses();
  }, []);

  const deleteItem = (id) => {
    deleteClasses(id);
    setClasses([...classes.filter((item) => item._id !== id)]);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <section className={styles.container}>
      <h2>Classes</h2>
      <button className={styles.addButton}> + Add new Class</button>
      <Modal
        title="The Class has been successfully deleted!"
        showModal={showModal}
        closeModal={closeModal}
      />
      <Table data={classes} deleteItem={deleteItem} setShowModal={setShowModal} />
    </section>
  );
};

export default Classes;
