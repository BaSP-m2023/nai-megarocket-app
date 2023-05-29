import React from 'react';
import styles from './table.module.css';
import { FaEdit } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';

const Table = ({ data, deleteItem, setShowModal }) => {
  const handleDelete = (id) => {
    deleteItem(id);
    setShowModal(true);
  };

  return (
    <table>
      <thead>
        <tr className={styles.trHeadContainer}>
          <th>Days</th>
          <th>Member</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          return (
            <tr key={item._id}>
              <td>{item.classes.day}</td>
              <td className={styles.nameContainer}>{item.member.firstName}</td>
              <td className={styles.buttonsContainer}>
                <button className={styles.buttonDelete} onClick={() => handleDelete(item._id)}>
                  <FaTimes />
                </button>
                <button className={styles.buttonDelete}>
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
