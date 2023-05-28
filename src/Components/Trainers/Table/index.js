import React, { useState } from 'react';
import styles from './table.module.css';
import ConfirmationModal from '../Modal';

const Table = ({ data, deleteItem }) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  const handleDeleteConfirmation = () => {
    if (selectedTrainer) {
      deleteItem(selectedTrainer._id);
      setShowConfirmationModal(false);
      setSelectedTrainer(null);
    }
  };

  const handleCancelConfirmation = () => {
    setShowConfirmationModal(false);
    setSelectedTrainer(null);
  };

  const openConfirmationModal = (trainer) => {
    setSelectedTrainer(trainer);
    setShowConfirmationModal(true);
  };

  return (
    <div>
      <table className={styles.tableContainer}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th></th>
            <th>Actions</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            return (
              <tr key={item._id}>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td></td>
                <td>
                  <button className={styles.editButton}>Edit</button>
                </td>
                <td>
                  <button
                    className={styles.deleteButton}
                    onClick={() => openConfirmationModal(item)}
                  >
                    X
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {showConfirmationModal && (
        <ConfirmationModal
          message={`Are you sure you want to delete the trainer ${selectedTrainer.firstName} ${selectedTrainer.lastName}?`}
          onConfirm={handleDeleteConfirmation}
          onCancel={handleCancelConfirmation}
        />
      )}
    </div>
  );
};

export default Table;
