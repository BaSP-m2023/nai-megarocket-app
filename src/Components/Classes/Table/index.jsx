import React, { useState } from 'react';
import styles from './table.module.css';
import ConfirmationModal from '../Modal';
import { FaEdit, FaTimes } from 'react-icons/fa';

const Table = ({ data, deleteItem, editItem }) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedClass, setSelectedClasses] = useState(null);
  const [modalTitle, setModalTitle] = useState('');

  const deleteConfirmation = () => {
    if (selectedClass) {
      deleteItem(selectedClass._id);
      setShowConfirmationModal(false);
      setSelectedClasses(null);
    }
  };

  const editConfirmation = () => {
    if (selectedClass) {
      editItem(selectedClass._id);
      setShowConfirmationModal(false);
      setSelectedClasses(null);
    }
  };

  const cancelConfirmation = () => {
    setShowConfirmationModal(false);
    setSelectedClasses(null);
  };

  const openConfirmationModal = (classe, mode) => {
    setSelectedClasses(classe);
    setModalTitle(mode === 'edit' ? 'Edit class' : 'Delete class');
    setShowConfirmationModal(true);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Hour</th>
            <th>Trainer</th>
            <th>Activity</th>
            <th>Slots</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            return (
              <tr key={item._id}>
                <td>{item.day.join(', ')}</td>
                <td>{item.hour}</td>
                <td>{item.trainer?.firstName}</td>
                <td>{item.activity?.name}</td>
                <td>{item.slots}</td>
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
            modalTitle === 'Delete Class'
              ? `Are you sure you want to delete the class ${selectedClass.day} ${selectedClass.hour}?`
              : `Are you sure you want to edit the class ${selectedClass.day} ${selectedClass.hour}?`
          }
          onConfirm={modalTitle === 'Delete class' ? deleteConfirmation : editConfirmation}
          onCancel={cancelConfirmation}
        />
      )}
    </div>
  );
};

export default Table;
