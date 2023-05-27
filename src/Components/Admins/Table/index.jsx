import React from 'react';
import styles from './table.module.css';
import { FaEdit } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';

const Table = ({ data, deleteItem }) => {
  return (
    <table className={styles.container}>
      <thead>
        <tr className={styles.tr}>
          <th className={styles.tr}>Name</th>
          <th>Last Name</th>
          <th>DNI</th>
          <th>Phone</th>
          <th>Email</th>
          <th>City</th>
          <th>Password</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          return (
            <tr key={item._id}>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.dni}</td>
              <td>{item.phone}</td>
              <td>{item.email}</td>
              <td>{item.city}</td>
              <td>{item.password}</td>
              <td>
                <button className={styles.deleteButton} onClick={() => deleteItem(item._id)}>
                  <FaTimes />
                </button>
                <button className={styles.editButton}>
                  <FaEdit />
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
