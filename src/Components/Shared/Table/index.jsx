import React, { useState } from 'react';
import Button from '../Button';
import { Button as ButtonMui } from '@mui/material/';
import styles from './table.module.css';
import { TbArrowsDownUp, TbArrowsUpDown } from 'react-icons/tb';
import Container from '../Container';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import Pagination from '@mui/material/Pagination';
import InputAdornment from '@mui/material/InputAdornment';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import SearchIcon from '@mui/icons-material/Search';
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
  showOrderButton = false,
  title,
  buttonId,
  addClick,
  historyAction
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
        <div className={styles.titleAndButton}>
          {' '}
          <h2>{title}</h2>
          <TextField
            type="search"
            placeholder="Search"
            variant="standard"
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
        </div>
        <div>
          {' '}
          {historyAction && (
            <ButtonMui
              sx={{
                marginRight: '10px',
                backgroundColor: '#212121',
                borderRadius: '300px',
                color: 'white',
                height: '62px',
                '&:hover': {
                  backgroundColor: '#263238'
                }
              }}
              id={'subscription-button-history'}
              onClick={historyAction}
            >
              <ManageHistoryIcon />
            </ButtonMui>
          )}
          <ButtonMui
            sx={{
              borderRadius: '300px',
              height: '62px'
            }}
            id={buttonId}
            onClick={addClick}
            color="primary"
            aria-label="add"
            variant="contained"
          >
            <AddIcon />
          </ButtonMui>
        </div>
      </div>
      <div className={styles.tableAndPag}>
        <table id={testId} className={styles.tableShared}>
          <thead className={styles.tableHead}>
            <tr className={styles.tableTrHead}>
              {<th className={`${styles.tableThtd} ${styles.thCorner}`}>#</th>}
              {columnTitles.map((title) => (
                <th className={styles.tableThtd} key={title}>
                  {title}
                </th>
              ))}
              <th className={`${styles.tableThtd} ${styles.thCornerRight}`}>
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
                <tr className={`${styles.tableTr} `} key={item._id}>
                  {
                    <td className={`${styles.tableThtd} ${styles.trFirst}`}>
                      {firstItemIndex + index}
                    </td>
                  }
                  {properties?.map((property, index) => {
                    const value = property
                      .split('.')
                      .reduce((acc, curr) => (acc ? acc[curr] : null), item);
                    const isArray = Array.isArray(value);
                    let displayValue = isArray ? value.join(', ') : value;
                    if (property === 'date') {
                      displayValue = formatDate(displayValue);
                    }
                    return (
                      <td className={styles.tableThtd} key={index}>
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
          <div className={styles.paginationContainer}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(event, value) => setCurrentPage(value)}
              color="primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
