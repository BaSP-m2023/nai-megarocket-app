import React from 'react';
import styles from './table.module.css';
import { FaEdit } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';

const Table = ({ data, deleteItem }) => {
  return (
    <table className={styles.container}>
      <thead className={styles.thead}>
        <tr className={styles.tr}>
          <th className={styles.th}>Name</th>
          <th className={styles.th}>Last Name</th>
          <th className={styles.th}>Phone</th>
          <th className={styles.th}>Email</th>
          <th className={styles.th}>Actions</th>
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {data.map((item) => {
          return (
            <tr key={item._id}>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.phone}</td>
              <td>{item.email}</td>
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
