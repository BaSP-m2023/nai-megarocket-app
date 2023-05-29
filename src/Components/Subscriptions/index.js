import { useEffect, useState } from 'react';
import styles from './subscriptions.module.css';
import Table from './Table';

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);

  const getSubscriptions = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL + '/subscriptions'}`);
      if (!response.ok) {
        throw new Error('An error ocurred trying to retrieve Subscriptions');
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
    setSubscriptions(subscriptions.filter((subscriptions) => subscriptions._id !== id));
  };

  return (
    <section className={styles.container}>
      <h2>Subscriptions</h2>
      <Table data={subscriptions} deleteItem={deleteItem} />
      <button className={styles.addSubs}> Add a new Subscription</button>
    </section>
  );
};

export default Subscriptions;
