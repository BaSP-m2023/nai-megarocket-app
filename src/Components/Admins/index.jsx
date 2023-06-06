import { useEffect, useState } from 'react';
import styles from './admins.module.css';
import Table from './Table';
import { useHistory } from 'react-router-dom';
import Modal from './Modals';

const Admins = () => {
  const [isDelete, setIsDelete] = useState(false);
  const [idDelete, setIdDelete] = useState();
  const [showModal, setShowModal] = useState(false);
  const [modalInformation, setModalInformation] = useState({ title: '', body: '' });
  const [admins, setAdmins] = useState([]);
  const history = useHistory();

  const getAdmins = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins`);
      if (!response.ok) {
        throw new Error('Error retrieving admins');
      }
      const data = await response.json();
      setAdmins(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAdmins();
  });

  const deleteAdmins = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Error deleting admin.');
      }
      const data = await response.json();
      setAdmins([...admins.filter((admin) => admin._id !== data.data._id)]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddAdmin = () => {
    history.push('/admins/form');
  };

  const handleUpdateAdmin = (id) => {
    history.push(`/admins/form/${id}`);
  };

  const deleteItem = (id) => {
    setModalInformation({ title: 'Warning', body: 'Are you sure?' });
    setIsDelete(true);
    setShowModal(true);
    setIdDelete(id);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  return (
    <section className={styles.container}>
      <h2>Admins</h2>
      <button className={styles.buttonAdmin} onClick={handleAddAdmin}>
        + Add new Admin
      </button>
      {admins.length !== 0 ? (
        <>
          <Modal
            idDelete={idDelete}
            isDelete={isDelete}
            show={showModal}
            handleCancelDelete={handleCancelDelete}
            deleteAdmins={deleteAdmins}
            title={modalInformation.title}
            body={modalInformation.body}
          />
          <Table data={admins} deleteItem={deleteItem} handleEdit={handleUpdateAdmin} />
        </>
      ) : (
        <>
          <h3>There are no admins in the database</h3>
        </>
      )}
    </section>
  );
};
export default Admins;
