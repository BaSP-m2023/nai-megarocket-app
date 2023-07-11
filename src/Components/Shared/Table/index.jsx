import React, { useState } from 'react';
import Button from '../Button';
import styles from './table.module.css';
import { IoChevronBackCircleOutline, IoChevronForwardCircleOutline } from 'react-icons/io5';
import { TbArrowsDownUp, TbArrowsUpDown } from 'react-icons/tb';
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
  testEditId,
  showButtons = true,
  showOrderButton = false
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterDate, setFilterDate] = useState('');
  const [isDescending, setIsDescending] = useState(true);
  const itemsPerPage = 10;

  if (!Array.isArray(data)) {
    return (
      <Container>
        <ClipLoader />
      </Container>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const isBoolean = (value) => {
    if (typeof value === 'boolean') {
      return value === true ? 'Yes' : 'No';
    }
    return value;
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setFilterDate(event.target.value);
    setCurrentPage(1);
  };

  const handleToggleOrder = () => {
    setIsDescending((prevState) => !prevState);
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
        const propertyValueLower = propertyValue?.toString().toLowerCase();

        if (filterDate) {
          const formattedDate = formatDate(propertyValue);
          return (
            formattedDate.includes(filterDate) ||
            propertyValueLower?.toString().toLowerCase().includes(searchTermLower)
          );
        }

        return propertyValueLower?.toString().toLowerCase().includes(searchTermLower);
      });
    })
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return isDescending ? dateB - dateA : dateA - dateB;
    });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData?.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const firstItemIndex = startIndex + 1;

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
            {<th className={styles.tableThtd}>#</th>}
            {columnTitles.map((title) => (
              <th className={styles.tableThtd} key={title}>
                {title}
              </th>
            ))}
            <th>
              {showOrderButton && (
                <button className={styles.orderButton} onClick={handleToggleOrder}>
                  {isDescending ? <TbArrowsDownUp /> : <TbArrowsUpDown />}
                </button>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedData?.map((item, index) => {
            return (
              <tr
                className={`${styles.tableTr} ${!item.isActive && styles.inactiveRow}`}
                key={item._id}
              >
                {<td className={styles.tableThtd}>{firstItemIndex + index}</td>}
                {properties?.map((property) => {
                  const value = property
                    .split('.')
                    .reduce((acc, curr) => (acc ? acc[curr] : null), item);
                  const isArray = Array.isArray(value);
                  let displayValue = isArray ? value.join(', ') : value;
                  if (property === 'date') {
                    displayValue = formatDate(displayValue);
                  }
                  return (
                    <td className={styles.tableThtd} key={property}>
                      {isBoolean(displayValue) ? isBoolean(displayValue) : displayValue}
                    </td>
                  );
                })}
                <td className={`${styles.tableThtd} ${styles.tableLastColumn}`}>
                  {showButtons && (
                    <>
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
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={styles.bottom}>
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

        <div className={styles.paginationContainer}>
          Page {currentPage} of {totalPages}
        </div>
      </div>
    </div>
  );
};

export default Table;
