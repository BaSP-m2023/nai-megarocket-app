import { useEffect, useState } from 'react';
import styles from './subscriptions.module.css';
import Table from './Table';

function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);

  const getSubscriptions = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL + '/subscriptions'}`);
    const { data } = await response.json();
    setSubscriptions(data);
  };

  useEffect(() => {
    getSubscriptions();
  }, []);

  return (
    <section className={styles.container}>
      <h2>Subscriptions</h2>
      <Table data={subscriptions} />
    </section>
  );
}

export default Subscriptions;
