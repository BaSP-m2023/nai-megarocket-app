import { useEffect, useState } from 'react';
import styles from './admins.module.css';
import Table from './Table';
import Form from './Form'
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
      setAdmins([...admins.filter((admin) => admin._id !== data.data._id)]);
      setIdDelete();
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

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  return (
    <section className={styles.container}>
      {admins.length !== 0 ? (
        <>
          <Modal
            idDelete={idDelete}
            show={showModal}
            handleCancelDelete={handleCancelDelete}
            deleteAdmins={deleteAdmins}
            title="Warning"
            body="Do you want to delete this admin?"
          />
          <h2>Admins</h2>
          <button className={styles.newButton} href="#">
            + Add new Admin
          </button>
          <Table data={admins} deleteItem={deleteItem} />
        </>
      ) : (
        <>
          <h2>Admins</h2>
          <h3>There are no admins in the database</h3>
          <button className={styles.newButton} href="#">
            + Add new Admin
          </button>
        </>
      )}
    </section>
  );
};

export default Admins;
