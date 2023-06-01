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

  const addSubscriptions = async ({ member: newMember, classes }) => {
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
      getSubscriptions();
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
      console.log(data);
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

  const getMember = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/members`);
      const { data } = await response.json();
      setMembers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteSubscriptions = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/subscriptions/${id}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSubscriptions();
    getClasses();
    getMember();
  }, []);

  const deleteItem = (id) => {
    deleteSubscriptions(id);
    setSubscriptions(subscriptions.filter((subscription) => subscription._id !== id));
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <section className={styles.container}>
      <Modal show={showModal} closeModal={closeModal} />
      <div className={styles.buttonContainer}>
        <h2>Subscriptions</h2>
        <button className={styles.addSubs}> Add a new Subscription</button>
      </div>
      <Table subscriptions={subscriptions} deleteItem={deleteItem} setShowModal={setShowModal} />
      <Form
        dataSubscription={subscriptions}
        dataClasses={classes}
        dataMembers={members}
        addSubscriptions={addSubscriptions}
      />
    </section>
  );
};

export default Subscriptions;
