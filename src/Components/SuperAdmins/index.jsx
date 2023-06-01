import { useEffect, useState } from 'react';
import styles from './super-admins.module.css';
import Table from './Table';
import Modal from './Modal';

const SuperAdmins = () => {
  const [showModal, setShowModal] = useState(false);
  const [superAdmins, setSuperAdmins] = useState([]);
  const [superAdminId, setSuperAdminId] = useState();

  const getSuperAdmins = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins`);
    const data = await response.json();
    setSuperAdmins(data.data);
  };

  const deleteSuperAdmin = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/${id}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSuperAdmins();
  }, []);

  const handleDeleteItem = (id) => {
    setShowModal(true);
    setSuperAdminId(id);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const deleteItem = () => {
    deleteSuperAdmin(superAdminId);
    setSuperAdmins([...superAdmins.filter((superAdmins) => superAdmins._id !== superAdminId)]);
  };

  return (
    <section className={styles.container}>
      <div className={styles.head}>
        <h2>Super Admins</h2>
        <button className={styles.addButton}>Add New</button>
      </div>
      <Table data={superAdmins} handleDeleteItem={handleDeleteItem} />
      <Modal
        closeModal={closeModal}
        showModal={showModal}
        confirmModal={deleteItem}
        warning="Are you sure you want delete this Super Admin?"
      />
    </section>
  );
};

export default SuperAdmins;
