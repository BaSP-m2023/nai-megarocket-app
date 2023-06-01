import React, { useEffect, useState } from 'react';
import styles from './subscriptions.module.css';
import Table from './Table';
import Modal from './Modal';
import Form from './Form';

const Subscriptions = () => {
  const [showModal, setShowModal] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);
  const [classes, setClasses] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedSubscriptionId, setSelectedSubscriptionId] = useState(null);

  const addSubscription = async ({ member: newMember, classes }) => {
    const newSubscription = {
      classes,
      member: newMember,
      date: new Date()
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/subscriptions`, {
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
    } catch (error) {
      console.error(error);
    }
  };

  const getSubscriptions = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/subscriptions`);
      if (!response.ok) {
        throw new Error('An error occurred trying to retrieve Subscriptions');
      }
      const { data } = await response.json();
      setSubscriptions(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getClasses = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/classes`);
      const { data } = await response.json();
      setClasses(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getMembers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/members`);
      const { data } = await response.json();
      setMembers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteSubscription = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/subscriptions/${id}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error(error);
    }
  };

  const confirmDelete = () => {
    if (selectedSubscriptionId) {
      deleteSubscription(selectedSubscriptionId);
      setSubscriptions(
        subscriptions.filter((subscription) => subscription._id !== selectedSubscriptionId)
      );
      setSelectedSubscriptionId(null);
      setShowModal(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setSelectedSubscriptionId(id);
    setShowModal(true);
  };

  useEffect(() => {
    getSubscriptions();
    getClasses();
    getMembers();
  }, []);

  return (
    <section className={styles.container}>
      <Modal show={showModal} closeModal={closeModal} onConfirm={confirmDelete} />
      <div className={styles.buttonContainer}>
        <h2>Subscriptions</h2>
        <button className={styles.addSubs}> Add a new Subscription</button>
      </div>
      <Table subscriptions={subscriptions} deleteItem={handleDelete} setShowModal={setShowModal} />
      <Form dataClasses={classes} dataMembers={members} addSubscription={addSubscription} />
    </section>
  );
};

export default Subscriptions;
