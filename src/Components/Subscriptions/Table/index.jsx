import React from 'react';
import styles from './table.module.css';
import { FaEdit, FaTimes } from 'react-icons/fa';

const Table = ({ subscriptions, handleDelete, handleEdit }) => {
  return (
    <table className={styles.subscriptionsTable}>
      <thead className={styles.theadContainer}>
        <tr className={styles.trContainer}>
          <th>First name</th>
          <th>Last name</th>
          <th>Class Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {subscriptions?.map((item) => {
          return (
            <tr key={item._id}>
              <td>{item.member?.firstName}</td>
              <td>{item.member?.lastName}</td>
              <td>{item.classes?.activity?.name}</td>
              <td className={styles.buttonsContainer}>
                <button className={styles.buttonDelete} onClick={() => handleDelete(item._id)}>
                  <FaTimes />
                </button>
                <button className={styles.buttonEdit} onClick={() => handleEdit(item._id)}>
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
