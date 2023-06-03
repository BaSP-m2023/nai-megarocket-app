import React from 'react';
import { FaTimes, FaEdit } from 'react-icons/fa';
import styles from './table.module.css';

const Table = ({ data, rows, columnTitles, handleUpdateItem, handleDeleteItem }) => {
  const isBoolean = (item) => {
    if (typeof item === 'boolean') {
      return item ? 'Yes' : 'No';
    }
    return item;
  };
  return (
    <table className={styles.tableShared}>
      <thead className={styles.tableHead}>
        <tr className={styles.tableTr}>
          {columnTitles.map((title) => (
            <th className={styles.tableThtd} key={title}>
              {title}
            </th>
          ))}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          return (
            <tr className={styles.tableTr} key={item._id}>
              {rows.map((row) => (
                <td className={styles.tableThtd} key={row}>
                  {isBoolean(item[row])}
                </td>
              ))}
              <td className={styles.tableThtd}>
                <i className="fas fa-edit" onClick={() => handleUpdateItem(item._id)}>
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
