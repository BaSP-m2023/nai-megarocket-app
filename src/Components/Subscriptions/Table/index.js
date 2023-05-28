import React from 'react';
import styles from './table-module.css';

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
            <tr key={item.id}>
              <td>{item.classes.day + ''}</td>
              <td>{item.member.firstName}</td>
              <td>
                <button className={styles.buttonDelete} onClick={() => deleteItem(item.id)}>
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
