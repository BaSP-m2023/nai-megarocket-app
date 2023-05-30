import React from 'react';
import styles from './table.module.css';
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';

const Table = ({ data, deleteItem, setShowModal }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Day</th>
          <th>Hour</th>
          <th>Trainer</th>
          <th>Activity</th>
          <th>Slots</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          return (
            <tr key={item._id}>
              <td>{item.day.join(', ')}</td>
              <td>{item.hour}</td>
              <td>{item.trainer.firstName}</td>
              <td>{item.activity.name}</td>
              <td>{item.slots}</td>
              <td>
                <button
                  className={styles.deleButton}
                  onClick={() => {
                    deleteItem(item._id);
                    setShowModal(true);
                  }}
                >
                  <FaTrash />
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
