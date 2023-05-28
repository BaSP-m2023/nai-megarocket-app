import { useState, useEffect } from 'react';
import styles from './classes.module.css';
// import Form from './Form';
import Table from './Table';

const Classes = () => {
  const [classes, setClasses] = useState([]);

  const getClasses = async () => {
    const response = await fetch(` ${process.env.REACT_APP_API_URL + '/classes'}`);
    const { data } = await response.json();
    setClasses(data);
  };

  const deleteClasses = async (id) => {
    const response = await fetch(` ${process.env.REACT_APP_API_URL + '/classes/' + id}`, {
      method: 'DELETE'
    });
    const { data } = await response.json();
    // setClasses(data.data);
    console.log(data);
  };

  useEffect(() => {
    getClasses();
  }, []);

  const deleteItem = (id) => {
    deleteClasses(id);
    setClasses([...classes.filter((item) => item._id !== id)]);
  };

  return (
    <section className={styles.container}>
      <h2>Classes</h2>
      <Table data={classes} deleteItem={deleteItem} />
    </section>
  );
};

export default Classes;
