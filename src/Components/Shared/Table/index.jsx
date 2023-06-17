import React from 'react';
import Button from '../Button';
import styles from './table.module.css';
const Table = ({ data, properties, columnTitles, handleUpdateItem, handleDeleteItem }) => {
  if (!Array.isArray(data)) {
    return <div>No data available</div>;
  }
  const isBoolean = (value) => {
    if (typeof value === 'boolean') {
      return value === true ? 'Yes' : 'No';
    }
    return value;
  };

  return (
    <table className={styles.tableShared}>
      <thead className={styles.tableHead}>
        <tr className={styles.tableTrHead}>
          {columnTitles.map((title) => (
            <th className={styles.tableThtd} key={title}>
              {title}
            </th>
          ))}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data?.map((item) => {
          return (
            <tr className={styles.tableTr} key={item._id}>
              {properties.map((property) => {
                const value = property
                  .split('.')
                  .reduce((acc, curr) => (acc ? acc[curr] : null), item);
                const isArray = Array.isArray(value);
                const displayValue = isArray ? value.join(', ') : value;
                return (
                  <td className={styles.tableThtd} key={property}>
                    {isBoolean(displayValue) ? isBoolean(displayValue) : displayValue}
                  </td>
                );
              })}
              <td className={`${styles.tableThtd} ${styles.tableLastColumn}`}>
                <Button type="edit" clickAction={() => handleUpdateItem(item._id)} />
                <Button type="delete" clickAction={() => handleDeleteItem(item._id)} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
export default Table;
