import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTrainers, deleteTrainer } from '../../Redux/trainers/thunks';
import { useHistory } from 'react-router-dom';
import styles from './trainers.module.css';
import Table from '../Shared/Table/index';
import Button from '../Shared/Button/index';
import SharedModal from '../Shared/Modal';

const Trainers = () => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [stateModal, setStateModal] = useState('success');
  const [modalMessage, setModalMessage] = useState('');
  const [selectedTrainerId, setSelectedTrainerId] = useState(null);
  const [isConfirmationModal, setIsConfirmationModal] = useState(true);
  const [typeStyle, setTypeStyle] = useState('default');

  const dispatch = useDispatch();
  const trainers = useSelector((state) => state.trainers.data);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      dispatch(getTrainers());
      setIsLoading(false);
    }, 1000);
  }, [dispatch]);

  const handleDelete = (id) => {
    setSelectedTrainerId(id);
    setModalMessage('Are you sure you want to delete this trainer?');
    setShowModal(true);
    setTypeStyle('default');
    setIsConfirmationModal(true);
  };

  const handleDeleteConfirmation = async () => {
    if (selectedTrainerId) {
      try {
        await dispatch(deleteTrainer(selectedTrainerId));
        setModalMessage('Trainer deleted successfully');
        setIsConfirmationModal(false);
        setTypeStyle('success');
        dispatch(getTrainers());
      } catch (error) {
        console.error('Error deleting trainer:', error);
        setModalMessage('Error deleting trainer');
        setTypeStyle('error');
        setStateModal('fail');
      }
    }
  };

  const handleDeleteCancel = () => {
    setSelectedTrainerId(null);
    setShowModal(false);
    setIsConfirmationModal(true);
  };

  const handleAddTrainer = () => {
    history.push('/src/Components/Trainers/Form/index.jsx');
  };

  const editItem = (id) => {
    history.push(`/trainers/form/${id}`);
  };

  const Spinner = () => {
    return (
      <div className={styles.spinner}>
        <div className={styles.dot1}></div>
        <div className={styles.dot2}></div>
      </div>
    );
  };

  return (
    <section className={styles.trainerContainer}>
      <div className={styles.headContainer}>
        <h2>Trainers</h2>
        <Link to="/trainers/form">
          <Button text="+ Add Trainer" clickAction={handleAddTrainer} type="add" />
        </Link>
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {trainers && trainers.length > 0 ? (
            <Table
              data={trainers}
              properties={['firstName', 'lastName', 'phone', 'email', 'salary']}
              columnTitles={['First Name', 'Last Name', 'Phone Number', 'Email', 'Salary']}
              handleUpdateItem={editItem}
              handleDeleteItem={handleDelete}
            />
          ) : (
            'No trainers to show'
          )}
        </>
      )}
      {showModal && (
        <SharedModal
          show={showModal}
          state={stateModal}
          title="Delete Trainer"
          body={modalMessage}
          isDelete={isConfirmationModal}
          typeStyle={typeStyle}
          closeModal={handleDeleteCancel}
          onConfirm={handleDeleteConfirmation}
        />
      )}
    </section>
  );
};

export default Trainers;
