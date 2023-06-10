import { useEffect, useState } from 'react';
import styles from './super-admins.module.css';
import Table from '../Shared/Table/index';
import SharedModal from '../Shared/Modal';
import Button from '../Shared/Button/index';
import { useHistory } from 'react-router-dom';

const SuperAdmins = () => {
  const history = useHistory();
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [superAdmins, setSuperAdmins] = useState([]);
  const [superAdminId, setSuperAdminId] = useState();
  const [modalInformation, setModalInformation] = useState({ title: '', body: '' });
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const getSuperAdmins = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins`);
      const data = await response.json();
      setSuperAdmins(data.data);
    } catch (error) {
      console.error(error);
      throw new Error('An error has ocurred, cannot get the Super Admins');
    }
  };

  useEffect(() => {
    getSuperAdmins();
  }, []);

  const deleteSuperAdmin = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/${id}`, {
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
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteSuperAdmin = (id) => {
    setModalInformation({ title: 'Warning', body: 'Are you sure?' });
    setShowDeleteWarning(true);
    setSuperAdminId(id);
  };

  const closeDeleteWarning = () => {
    setShowDeleteWarning(false);
  };

  const confirmDeleteSuperAdmin = async () => {
    try {
      await deleteSuperAdmin(superAdminId);
      setSuperAdmins((prevSuperAdmins) =>
        prevSuperAdmins.filter((superAdmin) => superAdmin._id !== superAdminId)
      );
      setShowDeleteWarning(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddSuperAdmin = () => {
    history.push('/super-admins/form');
  };

  const handleUpdateSuperAdmin = (id) => {
    history.push(`/super-admins/form/${id}`);
  };

  const handleExitAlert = () => {
    setShowSuccessAlert(false);
  };

  return (
    <section className={styles.container}>
      <div className={styles.head}>
        <h2>Super Admins</h2>
        <Button text="+ Add Super Admin" clickAction={handleAddSuperAdmin} type="add" />
      </div>
      <Table
        data={superAdmins || []}
        properties={['firstName', 'email']}
        columnTitles={['First Name', 'Email']}
        handleUpdateItem={handleUpdateSuperAdmin}
        handleDeleteItem={handleDeleteSuperAdmin}
      />
      <SharedModal
        show={showDeleteWarning}
        closeModal={closeDeleteWarning}
        onConfirm={confirmDeleteSuperAdmin}
        title={modalInformation.title}
        body={modalInformation.body}
        isDelete={true}
      />
      <SharedModal
        isDelete={false}
        show={showSuccessAlert}
        closeModal={handleExitAlert}
        title={'Success'}
        body={alertMessage}
      />
      <SharedModal
        isDelete={false}
        show={showAlert}
        closeModal={handleExitAlert}
        title={'Something is wrong'}
        body={alertMessage}
      />
    </section>
  );
};

export default SuperAdmins;
