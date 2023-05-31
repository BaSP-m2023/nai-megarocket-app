import { useEffect, useState } from 'react';
import styles from './super-admins.module.css';
import Table from './Table';
import Modal from './Modal';
import Form from './Form';

const SuperAdmins = () => {
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [showSuperAdminForm, setShowSuperAdminForm] = useState(false);
  const [method, setMethod] = useState('');
  const [superAdmins, setSuperAdmins] = useState([]);
  const [superAdminId, setSuperAdminId] = useState();

  const getSuperAdmins = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins`);
    const data = await response.json();
    setSuperAdmins(data.data);
  };

  const deleteSuperAdmin = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const addSuperAdmin = async (superAdmin) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(superAdmin)
      });
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
      } else {
        getSuperAdmins();
        closeSuperAdminForm();
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      throw new Error('An error has ocurred creating the Super Admin');
    }
  };

  const updateSuperAdmin = async (id, superAdmin) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/super-admins/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(superAdmin)
      });
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
      } else {
        getSuperAdmins();
        closeSuperAdminForm();
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      throw new Error('An error has ocurred updating the Super Admin');
    }
  };

  useEffect(() => {
    getSuperAdmins();
  }, []);

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
    setMethod('POST');
    setShowSuperAdminForm(true);
    showSuperAdminForm;
  };

  const closeSuperAdminForm = () => {
    setShowSuperAdminForm(false);
  };

  const handleUpdateSuperAdmin = (id) => {
    setMethod('PUT');
    setSuperAdminId(id);
    setShowSuperAdminForm(true);
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
      <Form
        data={superAdmins}
        closeForm={closeSuperAdminForm}
        showForm={showSuperAdminForm}
        addItem={addSuperAdmin}
        updateItem={updateSuperAdmin}
        itemId={superAdminId}
        method={method}
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
