import React, { useEffect, useState } from 'react';
import styles from './subscriptions.module.css';
import Table from './Table';
import Modal from './Modal';
import Form from './Form';

const Subscriptions = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);
  const [classes, setClasses] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedSubscriptionId, setSelectedSubscriptionId] = useState(null);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [method, setMethod] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const addSubscription = async ({ member: newMember, classes }) => {
    const newSubscription = {
      classes,
      member: newMember,
      date: new Date()
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSubscription)
      });

      if (!response.ok) {
        throw new Error('Failed to add subscription');
      }

      const { data } = await response.json();

      setSubscriptions([...subscriptions, data]);
      setSuccessMessage('Subscription added successfully');
      getSubscriptions();
    } catch (error) {
      console.error(error);
    }
  };

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

  const getClasses = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/classes`);
      if (!response.ok) {
        throw new Error('Failed to get classes');
      }
      const { data } = await response.json();
      setClasses(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getMembers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/members`);
      if (!response.ok) {
        throw new Error('Failed to get members');
      }
      const { data } = await response.json();
      setMembers(data);
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

  const updateSubscription = async (updatedSubscription) => {
    try {
      if (!selectedSubscription || !selectedSubscription._id) {
        throw new Error('Invalid subscription ID');
      }

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/subscriptions/${selectedSubscription._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedSubscription)
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update subscription');
      }

      setSuccessMessage('Subscription updated successfully');
      getSubscriptions();
      setSelectedSubscription(null);
      setShowEditModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleShowAddModal = () => {
    setSelectedSubscription(null);
    setMethod('');
    setShowForm(true);
    setShowDeleteModal(false);
  };

  const handleShowDeleteModal = (id) => {
    setSelectedSubscriptionId(id);
    setShowDeleteModal(true);
  };

  const handleShowEditModal = (item) => {
    setSelectedSubscription(item);
    setMethod('PUT');
    setShowForm(true);
    setShowDeleteModal(false);
  };

  const handleEdit = (item) => {
    setSelectedSubscription(item);
    setMethod('PUT');
    setShowEditModal(true);
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleDelete = () => {
    deleteSubscription(selectedSubscriptionId);
    setShowDeleteModal(false);
    setSelectedSubscriptionId(null);
  };

  useEffect(() => {
    getSubscriptions();
    getClasses();
    getMembers();
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
        <button className={styles.addSubs} onClick={handleShowAddModal}>
          Add New Subscription
        </button>
      </div>
      <Form
        className={styles.formContainer}
        dataClasses={classes}
        dataMembers={members}
        addSubscription={addSubscription}
        selectedSubscription={selectedSubscription}
        updateSubscription={updateSubscription}
        method={method}
        showForm={showForm}
      />
      <Table
        subscriptions={subscriptions}
        deleteItem={handleShowDeleteModal}
        handleEdit={handleShowEditModal}
        handleShowForm={handleShowForm}
      />
    </section>
  );
};

export default Subscriptions;
