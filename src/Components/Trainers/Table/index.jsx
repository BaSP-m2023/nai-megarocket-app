import React, { useState } from 'react';
import styles from './table.module.css';
import ConfirmationModal from '../Modal';
import { FaEdit, FaTimes } from 'react-icons/fa';

const Table = ({ data, deleteItem, editItem }) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [modalTitle, setModalTitle] = useState('');

  const handleDeleteConfirmation = () => {
    if (selectedTrainer) {
      deleteItem(selectedTrainer._id);
      setShowConfirmationModal(false);
      setSelectedTrainer(null);
    }
  };

  const handleEditConfirmation = () => {
    if (selectedTrainer) {
      editItem(selectedTrainer._id);
      setShowConfirmationModal(false);
      setSelectedTrainer(null);
    }
  };

  const handleCancelConfirmation = () => {
    setShowConfirmationModal(false);
    setSelectedTrainer(null);
  };

  const openConfirmationModal = (trainer, mode) => {
    setSelectedTrainer(trainer);
    setModalTitle(mode === 'edit' ? 'Edit trainer' : 'Delete trainer');
    setShowConfirmationModal(true);
  };

  return (
    <div>
      <table className={styles.tableContainer}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            return (
              <tr key={item._id}>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>
                  <button
                    className={styles.editButton}
                    onClick={() => openConfirmationModal(item, 'edit')}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => openConfirmationModal(item, 'delete')}
                  >
                    <FaTimes />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {showConfirmationModal && (
        <ConfirmationModal
          title={modalTitle}
          message={
            modalTitle === 'Delete trainer'
              ? `Are you sure you want to delete the trainer ${selectedTrainer.firstName} ${selectedTrainer.lastName}?`
              : `Are you sure you want to edit the trainer ${selectedTrainer.firstName} ${selectedTrainer.lastName}?`
          }
          onConfirm={
            modalTitle === 'Delete trainer' ? handleDeleteConfirmation : handleEditConfirmation
          }
          onCancel={handleCancelConfirmation}
        />
      )}
    </div>
  );
};

export default Table;
