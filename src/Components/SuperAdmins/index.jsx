import { useEffect, useState } from 'react';
import styles from './super-admins.module.css';
import Table from '../Shared/Table/index';
import Modal from '../Shared/Modal/index';
import Button from '../Shared/Button/index';
import { useHistory } from 'react-router-dom';

const SuperAdmins = () => {
  const history = useHistory();
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [superAdmins, setSuperAdmins] = useState([]);
  const [superAdminId, setSuperAdminId] = useState();

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
      alert(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteSuperAdmin = (id) => {
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

  return (
    <section className={styles.container}>
      <div className={styles.head}>
        <h2 className={styles.tableTitle}>Super Admins</h2>
        <Button text="Add New" clickAction={handleAddSuperAdmin} type="add" />
      </div>
      <Table
        data={superAdmins || []}
        properties={['firstName', 'email', 'password']}
        columnTitles={['First Name', 'Email', 'Password']}
        handleUpdateItem={handleUpdateSuperAdmin}
        handleDeleteItem={handleDeleteSuperAdmin}
      />
      <Modal
        show={showDeleteWarning}
        closeModal={closeDeleteWarning}
        onConfirm={confirmDeleteSuperAdmin}
        title="Delete Super Admin"
        body="Are you sure you want to delete this Super Admin?"
        isDelete={true}
      />
    </section>
  );
};

export default SuperAdmins;
