import React, { useState } from 'react';
import Button from '../Button';
import styles from './table.module.css';
import { IoChevronBackCircleOutline, IoChevronForwardCircleOutline } from 'react-icons/io5';
import Container from '../Container';
import { ClipLoader } from 'react-spinners';

const Table = ({
  data,
  properties,
  columnTitles,
  handleUpdateItem,
  handleDeleteItem,
  testId,
  testCancelId,
  testEditId
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  if (!Array.isArray(data)) {
    return (
      <Container>
        <ClipLoader />
      </Container>
    );
  }

  const isBoolean = (value) => {
    if (typeof value === 'boolean') {
      return value === true ? 'Yes' : 'No';
    }
    return value;
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const filteredData = data
    .filter((item) => {
      const searchTermLower = searchTerm?.toLowerCase();
      return properties?.some((property) => {
        const propertyValue = property
          .split('.')
          .reduce((acc, curr) => (acc ? acc[curr] : null), item);
        return propertyValue?.toString().toLowerCase().includes(searchTermLower);
      });
    })
    .sort((a, b) => b?.isActive - a?.isActive);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData?.slice(startIndex, endIndex);

  return (
    <div className={styles.containerT}>
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Search"
          id="table-input-search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <table id={testId} className={styles.tableShared}>
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
          {paginatedData?.map((item) => {
            return (
              <tr
                className={`${styles.tableTr} ${!item.isActive && styles.inactiveRow}`}
                key={item._id}
              >
                {properties?.map((property) => {
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
                  <Button
                    testId={testEditId}
                    type="edit"
                    clickAction={() => handleUpdateItem(item._id)}
                  />
                  <Button
                    testId={testCancelId}
                    type="delete"
                    clickAction={() => handleDeleteItem(item._id)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className={styles.pagination}>
        <button
          id="table-button-previous"
          className={styles.pagButton}
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          <IoChevronBackCircleOutline size={30} />
        </button>
        <button
          id="table-button-next"
          className={styles.pagButton}
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
        >
          <IoChevronForwardCircleOutline size={30} />
        </button>
      </div>
    </div>
  );
};

export default Table;
