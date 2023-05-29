import { useEffect, useState } from 'react';
import styles from './subscriptions.module.css';
import Table from './Table';
import Modal from './Modal';

const Subscriptions = () => {
  const [showModal, setShowModal] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);

  const getSubscriptions = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL + '/subscriptions'}`);
      if (!response.ok) {
        throw new Error('An error occurred trying to retrieve Subscriptions');
      }
      const { data } = await response.json();
      setSubscriptions(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteSubscriptions = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL + '/subscriptions/' + id}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSubscriptions();
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
      <Table data={subscriptions} deleteItem={deleteItem} setShowModal={setShowModal} />
    </section>
  );
};

export default Subscriptions;
