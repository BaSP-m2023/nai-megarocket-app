import React from 'react';
import styles from './table-module.css';
import { FaEdit } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';

const Table = ({ data, deleteItem }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Days</th>
          <th>Member</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          return (
            <tr key={item._id}>
              <td>{item.classes.day}</td>
              <td>{item.member.firstName}</td>
              <td>
                <button className={styles.buttonDelete} onClick={() => deleteItem(item._id)}>
                  <FaTimes />
                </button>
                <button>
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
