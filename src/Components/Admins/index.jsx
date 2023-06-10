import { useEffect, useState } from 'react';
import styles from './admins.module.css';
import Table from '../Shared/Table';
import Button from '../Shared/Button';
import SharedModal from '../Shared/Modal';
import { useHistory } from 'react-router-dom';

const Admins = () => {
  const [isDelete, setIsDelete] = useState(false);
  const [typeStyle, setTypeStyle] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalInformation, setModalInformation] = useState({ title: '', body: '' });
  const [admins, setAdmins] = useState([]);
  const [idAdmin, setIdAdmin] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
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
      const data = await response.json();
      if (!response.ok) {
        setAlertMessage(data.message);
        setShowAlert(true);
      } else {
        setAlertMessage(data.message);
        setShowSuccessAlert(true);
      }
      setAdmins([...admins.filter((admin) => admin._id !== data.data._id)]);
      setShowModal(false);
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

  const handleDeleteAdmin = (id) => {
    setModalInformation({ title: 'Warning', body: 'Are you sure?' });
    setIsDelete(true);
    setShowModal(true);
    setTypeStyle('success');
    setIdAdmin(id);
  };

  const confirmDelete = () => {
    deleteAdmins(idAdmin);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  const handleExitAlert = () => {
    setShowAlert(false);
    setShowSuccessAlert(false);
  };

  return (
    <section className={styles.adminContainer}>
      <div className={styles.topAdminContainer}>
        <h2>Admins</h2>
        <Button text={'+ Add Admins'} type={'add'} clickAction={handleAddAdmin} />
      </div>
      {admins.length !== 0 ? (
        <>
          <SharedModal
            isDelete={false}
            show={showAlert}
            closeModal={handleExitAlert}
            title={'Something is wrong'}
            body={alertMessage}
          />
          <SharedModal
            isDelete={false}
            show={showSuccessAlert}
            closeModal={handleExitAlert}
            title={'Success'}
            body={alertMessage}
          />
          <SharedModal
            show={showModal}
            typeStyle={typeStyle}
            title={modalInformation.title}
            body={modalInformation.body}
            isDelete={isDelete}
            onConfirm={confirmDelete}
            closeModal={handleCancelDelete}
          />
          <Table
            data={admins}
            properties={['firstName', 'lastName', 'phone', 'email']}
            columnTitles={['First Name', 'Last Name', 'Phone Number', 'Email']}
            handleUpdateItem={handleUpdateAdmin}
            handleDeleteItem={handleDeleteAdmin}
          />
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
