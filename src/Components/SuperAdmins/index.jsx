import { useEffect, useState } from 'react';
import styles from './super-admins.module.css';
import Table from '../Shared/Table/index';
import SharedModal from '../Shared/Modal';
import Button from '../Shared/Button/index';
import { useHistory } from 'react-router-dom';
import { getSuperAdmins, deleteSuperAdmin } from '../../Redux/superadmins/thunks';
import { useSelector, useDispatch } from 'react-redux';

const SuperAdmins = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const superAdmins = useSelector((state) => state.superAdmin.data.data);
  const loading = useSelector((state) => state.superAdmin.loading);
  const [superAdminId, setSuperAdminId] = useState();
  const [modalInformation, setModalInformation] = useState({ title: '', body: '' });
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    dispatch(getSuperAdmins());
  }, []);

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
      const response = await dispatch(deleteSuperAdmin(superAdminId));
      const data = response.data;
      setShowDeleteWarning(false);
      setAlertMessage(data.message);
      setShowAlert(true);
    } catch (error) {
      setShowDeleteWarning(false);
      setAlertMessage(error.message);
      setShowAlert(true);
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
      {loading ? (
        <p>Loading super admins...</p>
      ) : superAdmins && superAdmins.length > 0 ? (
        <>
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
            typeStyle={'success'}
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
        </>
      ) : (
        <p>No data available.</p>
      )}
    </section>
  );
};

export default SuperAdmins;
