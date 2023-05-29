import { useEffect, useState } from 'react';
import styles from './admins.module.css';
import Table from './Table';
import Modal from './Modals';

const Admins = () => {
  const [showModal, setShowModal] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [idDelete, setIdDelete] = useState();

  const getAdmins = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL + '/admins'}`);
      if (!response.ok) {
        throw new Error('Error retrieving admins');
      }
      const data = await response.json();
      setAdmins(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAdmins = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Error deleting admin.');
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAdmins();
  }, []);

  const deleteItem = (id) => {
    setShowModal(true);
    setIdDelete(id);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const onCloseModal = () => {
    deleteAdmins(idDelete);
    setAdmins([...admins.filter((admin) => admin._id !== idDelete)]);
    setIdDelete();
  };

  if (admins != '') {
    return (
      <section className={styles.container}>
        <Modal
          show={showModal}
          closeModal={closeModal}
          onCloseModal={onCloseModal}
          title="Warning"
          body="Do you want to delete this admin?"
        />
        <h2>Admins</h2>
        <button className={styles.newButton} href="#">
          + Add new Admin
        </button>
        <Table data={admins} deleteItem={deleteItem} />
      </section>
    );
  } else {
    return (
      <section className={styles.container}>
        <h2>Admins</h2>
        <h3>There are no admins in the database</h3>
        <button className={styles.newButton} href="#">
          + Add new Admin
        </button>
      </section>
    );
  }
};

export default Admins;
