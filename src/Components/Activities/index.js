import { useEffect, useState } from 'react';
import styles from './activities.module.css';
import Table from './Table';

const Activities = () => {
  const [activities, setActivities] = useState([]);

  const getActivities = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL + '/activities'}`);
    const { data } = await response.json();
    setActivities(data);
  };

  const deleteActivities = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL + '/activities/' + id}`, {
      method: 'DELETE'
    });
    const { data } = await response.json();
    // setActivities(data);
    console.log(data);
  };

  useEffect(() => {
    getActivities();
  }, []);

  const deleteItem = async (id) => {
    await deleteActivities(id);
    setActivities(activities.filter((activity) => activity._id !== id));
  };

  return (
    <section className={styles.container}>
      <h2>Activities</h2>
      <Table data={activities} deleteItem={deleteItem} />

      <button className={styles.addButton}> + Add new activity</button>
    </section>
  );
};

export default Activities;
