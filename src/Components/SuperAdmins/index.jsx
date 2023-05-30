import { useEffect, useState } from 'react';
import styles from './super-admins.module.css';
import Table from './Table';
import Modal from './Modal';
import Form from './Form';

const SuperAdmins = () => {
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
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
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      throw new Error('An error has ocurred creating the Super Admin');
    }
  };

  useEffect(() => {
    getSuperAdmins();
  }, []);

  const handleDelete = (id) => {
    setShowDeleteWarning(true);
    setSuperAdminId(id);
  };

  const deleteItem = () => {
    deleteSuperAdmin(superAdminId);
    setSuperAdmins([...superAdmins.filter((superAdmins) => superAdmins._id !== superAdminId)]);
  };

  const closeWarning = () => {
    setShowDeleteWarning(false);
  };

  const handleAddItem = () => {
    setShowCreateForm(true);
    showCreateForm;
  };

  const addItem = (superAdmin) => {
    addSuperAdmin(superAdmin);
  };

  const closeCreateForm = () => {
    setShowCreateForm(false);
  };

  const handleEditItem = (id) => {
    setShowCreateForm(true);
    setSuperAdminId(id);
  };

  return (
    <section className={styles.container}>
      <div className={styles.head}>
        <h2>Super Admins</h2>
        <button onClick={handleAddItem} className={styles.addButton}>
          Add New
        </button>
      </div>
      <Table data={superAdmins} handleDelete={handleDelete} handleEditItem={handleEditItem} />
      <Form
        data={superAdmins}
        closeCreateForm={closeCreateForm}
        showCreateForm={showCreateForm}
        addSuperAdmin={addItem}
      />
      <Modal
        closeWarning={closeWarning}
        showDeleteWarning={showDeleteWarning}
        confirmDelete={deleteItem}
        warningMsg="Are you sure you want delete this Super Admin?"
      />
    </section>
  );
};

export default SuperAdmins;
