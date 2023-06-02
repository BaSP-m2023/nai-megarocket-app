import React from 'react';
import styles from './super-admins.module.css';
import { FaTimes, FaEdit } from 'react-icons/fa';

const Table = (props) => {
  return (
    <table className={styles.tableSuperAdmin}>
      <thead>
        <tr className={styles.thead}>
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((item) => {
          return (
            <tr className={styles.tableRow} key={item._id}>
              <td>{item.firstName}</td>
              <td>{item.email}</td>
              <td className={styles.actions}>
                <i className="fas fa-edit" onClick={() => props.handleUpdateItem(item._id)}>
                  <FaEdit className={styles.actionButton} />
                </i>
                <i className="fas fa-times" onClick={() => props.handleDeleteItem(item._id)}>
                  <FaTimes className={styles.actionButton} />
                </i>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
