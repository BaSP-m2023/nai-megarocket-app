import React from 'react';
import styles from './table.module.css';

const Table = ({ data, deleteItem }) => {
  return (
    <table className={styles.tableContainer}>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          return (
            <tr key={item.id}>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td></td>
              <td>
                <button className={styles.editButton}>Edit</button>
              </td>
              <td>
                <button className={styles.deleteButton} onClick={() => deleteItem(item._id)}>
                  X
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
