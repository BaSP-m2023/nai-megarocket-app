import { useEffect, useState } from 'react';
import styles from './super-admins.module.css';
import Table from './Table';
import Modal from './Modal';
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

  const confirmDeleteSuperAdmin = () => {
    deleteSuperAdmin(superAdminId);
    setSuperAdmins([...superAdmins.filter((superAdmins) => superAdmins._id !== superAdminId)]);
  };

  const closeDeleteWarning = () => {
    setShowDeleteWarning(false);
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
        <button onClick={handleAddSuperAdmin} className={styles.addButton}>
          Add New
        </button>
      </div>
      <Table
        data={superAdmins}
        handleDeleteItem={handleDeleteSuperAdmin}
        handleUpdateItem={handleUpdateSuperAdmin}
      />
      <Modal
        closeWarning={closeDeleteWarning}
        showWarning={showDeleteWarning}
        confirmDelete={confirmDeleteSuperAdmin}
        warningMsg="Are you sure you want to delete this Super Admin?"
      />
    </section>
  );
};

export default SuperAdmins;
