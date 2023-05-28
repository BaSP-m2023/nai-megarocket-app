import styles from './trainers.module.css';
import Table from './Table';
/* import Modal from './Modal'; */
import { useEffect, useState } from 'react';

const Trainers = () => {
  const [trainers, setTrainers] = useState([]);
  const getTrainers = async () => {
    const response = await fetch('https://nai-megarocket-server.vercel.app/api/trainers');
    const data = await response.json();
    setTrainers(data.data);
  };
  useEffect(() => {
    getTrainers();
  }, []);
  const deleteItem = (id) => {
    setTrainers([...trainers.filter((trainer) => trainer._id !== id)]);
  };
  return (
    <section className={styles.container}>
      <h2>Trainers</h2>
      <Table data={trainers} deleteItem={deleteItem} />
    </section>
  );
};

export default Trainers;
