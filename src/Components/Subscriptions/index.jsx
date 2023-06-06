import React, { useEffect, useState } from 'react';
import styles from './subscriptions.module.css';
import Table from './Table';
import Modal from './Modal';
import { useHistory } from 'react-router-dom';

const Subscriptions = () => {
  const history = useHistory();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);
  /*   const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [method, setMethod] = useState(''); */
  const [successMessage, setSuccessMessage] = useState('');

  const getSubscriptions = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions`);
      if (!response.ok) {
        throw new Error('Failed to get subscriptions');
      }
      const { data } = await response.json();
      setSubscriptions(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteSubscription = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions/${id}`, {
        method: 'DELETE'
      });
      setSubscriptions(subscriptions.filter((subscription) => subscription._id !== id));
      setSuccessMessage('Subscription deleted successfully');
      getSubscriptions();
    } catch (error) {
      console.error(error);
    }
  };

  /*   const handleShowEditModal = () => {
    setSelectedSubscription(item);
    setMethod('PUT'); 
    setShowDeleteModal(false);
  }; */

  const handleAdd = () => {
    history.push('/subscriptions/form');
  };

  const handleEdit = (id) => {
    history.push(`/subscriptions/form/${id}`);
  };

  const handleDelete = (id) => {
    deleteSubscription(id);
    setShowDeleteModal(false);
  };

  useEffect(() => {
    getSubscriptions();
  }, []);

  return (
    <section className={styles.container}>
      <Modal
        show={showDeleteModal}
        title="Confirm Deletion"
        message="Are you sure you want to delete this subscription?"
        confirmText="Delete"
        onConfirm={handleDelete}
        closeModal={() => setShowDeleteModal(false)}
        showCancel={true}
      />
      <Modal
        show={showEditModal}
        title="Edit Subscription"
        message="Edit subscription details"
        confirmText="Save"
        onConfirm={handleEdit}
        closeModal={() => setShowEditModal(false)}
        showCancel={true}
      />
      <Modal
        show={successMessage !== ''}
        title="Success"
        message={successMessage}
        confirmText="OK"
        onConfirm={() => setSuccessMessage('')}
        closeModal={() => setSuccessMessage('')}
        showCancel={false}
      />
      <div className={styles.buttonContainer}>
        <h2>Subscriptions</h2>
        <button className={styles.addSubs} onClick={handleAdd}>
          Add New Subscription
        </button>
      </div>
      <Table subscriptions={subscriptions} handleDelete={handleDelete} handleEdit={handleEdit} />
    </section>
  );
};

export default Subscriptions;
