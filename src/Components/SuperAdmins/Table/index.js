import React from 'react';
import styles from './super-admins.module.css';
import { FaTimes } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';

const Table = ({ data, handleDeleteItem }) => {
  return (
    <table>
      <thead className={styles.thead}>
        <tr>
          <th>Nombre</th>
          <th>Email</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          return (
            <tr key={item._id}>
              <td>{item.firstName}</td>
              <td>{item.email}</td>
              <td>
                <i className="fas fa-edit" onClick={() => alert('hola')}>
                  <FaEdit />
                </i>
                <i className="fas fa-times" onClick={() => handleDeleteItem(item._id)}>
                  <FaTimes />
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
