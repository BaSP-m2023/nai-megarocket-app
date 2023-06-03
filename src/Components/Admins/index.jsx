import { useEffect, useState } from 'react';
import styles from './admins.module.css';
import Table from './Table';
import Form from './Form';
import Modal from './Modals';

const Admins = () => {
  const [showModal, setShowModal] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [idDelete, setIdDelete] = useState();
  const [showForm, setShowForm] = useState(false);
  const [adminEdit, setAdminEdit] = useState([]);
  const [modalInformation, setModalInformation] = useState({ title: '', body: '' });
  const [isDelete, setIsDelete] = useState(false);

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
      setIdDelete();
    } catch (error) {
      console.error(error);
    }
  };

  const postAdmins = async (formData) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        setModalInformation({ title: 'Admin not added', body: 'Error posting an admin' });
        setIsDelete(false);
        setShowModal(true);
        throw new Error(data.message);
      }
      setModalInformation({ title: 'Admin added', body: 'The admin will be added' });
      setIsDelete(false);
      setShowModal(true);
    } catch (error) {
      setModalInformation({ title: 'Admin not added', body: error.message });
      setIsDelete(false);
      setShowModal(true);
      console.error(error);
    }
  };

  const putAdmins = async (formData) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins/${adminEdit._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (!data.ok) {
        setModalInformation({ title: 'Admin not updated', body: 'Error editing an admin:' });
        setIsDelete(false);
        setShowModal(true);
        throw new Error(data.message);
      }
      setModalInformation({ title: 'Admin updated', body: 'The admin will be updated' });
      setIsDelete(false);
      setShowModal(true);
      setAdminEdit([]);
    } catch (error) {
      setModalInformation({ title: 'Admin not updated', body: error.message });
      setIsDelete(false);
      setShowModal(true);
      console.error(error);
    }
  };

  useEffect(() => {
    getAdmins();
  });

  const deleteItem = (id) => {
    setModalInformation({ title: 'Warning', body: 'Are you sure?' });
    setIsDelete(true);
    setShowModal(true);
    setIdDelete(id);
  };

  const postAdminForm = (formData) => {
    postAdmins(formData);
  };

  const putAdminForm = (formData) => {
    putAdmins(formData);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  const handleEdit = (admin) => {
    setShowForm(true);
    setAdminEdit(admin);
  };
  const hadleShowForm = () => {
    showForm ? setShowForm(false) : setShowForm(true);
  };

  return (
    <section className={styles.container}>
      <h2>Admins</h2>
      <button
        className={styles.newButton}
        onClick={() => {
          hadleShowForm();
          setAdminEdit([]);
        }}
      >
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
          <Table data={admins} deleteItem={deleteItem} handleEdit={handleEdit} />
        </>
      ) : (
        <>
          <h3>There are no admins in the database</h3>
        </>
      )}
      {showForm && (
        <Form postAdminForm={postAdminForm} putAdminForm={putAdminForm} adminEdit={adminEdit} />
      )}
    </section>
  );
};
export default Admins;
