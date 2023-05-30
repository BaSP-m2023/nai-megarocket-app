import React from 'react';
import styles from './super-admins.module.css';
import { FaTimes } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';

const Table = ({ data, handleDelete, handleEditItem }) => {
  return (
    <table className={styles.tableSuperAdmin}>
      <thead>
        <tr className={styles.thead}>
          <th>Nombre</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          return (
            <tr className={styles.tableRow} key={item._id}>
              <td>{item.firstName}</td>
              <td>{item.email}</td>
              <td className={styles.actions}>
                <i className="fas fa-edit" onClick={() => handleEditItem(item._id)}>
                  <FaEdit />
                </i>
                <i className="fas fa-times" onClick={() => handleDelete(item._id)}>
                  <FaTimes className={styles.deleteButton} />
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
