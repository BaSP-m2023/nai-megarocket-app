import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTrainers, deleteTrainer } from 'Redux/trainers/thunks';
import { useHistory } from 'react-router-dom';
import styles from './trainers.module.css';
import Table from 'Components/Shared/Table/index';
import Button from 'Components/Shared/Button/index';
import SharedModal from 'Components/Shared/Modal';
import ClipLoader from 'react-spinners/ClipLoader';
import Container from 'Components/Shared/Container';
import toast, { Toaster } from 'react-hot-toast';

const Trainers = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [selectedTrainerId, setSelectedTrainerId] = useState(null);
  const [isConfirmationModal, setIsConfirmationModal] = useState(true);
  const [typeStyle, setTypeStyle] = useState('default');
  const trainersState = useSelector((state) => state.trainers);
  const trainers = trainersState.data;
  const isLoading = trainersState.loading;

  useEffect(() => {
    toast.remove();
    dispatch(getTrainers());
    const toastMessage = localStorage.getItem('toastMessage');
    if (toastMessage) {
      showToast(toastMessage, 'success');
      localStorage.removeItem('toastMessage');
    }
  }, []);

  const showToast = (message, type) => {
    if (type === 'success') {
      toast.success(message, {
        duration: 2500,
        position: 'top-right',
        style: {
          background: '#fddba1'
        },
        iconTheme: {
          primary: '#0f232e',
          secondary: '#fff'
        }
      });
    } else if (type === 'error') {
      toast.error(message, {
        duration: 2500,
        position: 'top-right',
        style: {
          background: 'rgba(227, 23, 10, 0.5)'
        },
        iconTheme: {
          primary: '#0f232e',
          secondary: '#fff'
        }
      });
    }
  };

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
        const data = await dispatch(deleteTrainer(selectedTrainerId));
        showToast(data.message, 'success');
        setShowModal(false);
      } catch (error) {
        showToast(error.message, 'error');
        setShowModal(false);
      }
    }
  };

  const handleDeleteCancel = () => {
    setSelectedTrainerId(null);
    setShowModal(false);
    setIsConfirmationModal(true);
  };

  const handleAddTrainer = () => {
    history.push('/admins/trainers/form');
  };

  const editItem = (id) => {
    history.push(`/admins/trainers/form/${id}`);
  };

  return (
    <>
      <Toaster
        containerStyle={{
          margin: '10vh 0 0 0'
        }}
      />

      {isLoading ? (
        <Container center={true}>
          <ClipLoader />
        </Container>
      ) : (
        <Container>
          <div className={styles.headContainer}>
            <h2>Trainers</h2>
            <Button
              text="+ Add Trainer"
              clickAction={handleAddTrainer}
              type="add"
              testId={'admin-trainer-add-button'}
            />
          </div>
          {!trainers ? (
            <h3>No trainers to show</h3>
          ) : trainers.length > 0 ? (
            <Table
              data={trainers}
              properties={['firstName', 'lastName', 'phone', 'email', 'salary', 'isActive']}
              columnTitles={[
                'First Name',
                'Last Name',
                'Phone Number',
                'Email',
                'Salary',
                'Active'
              ]}
              handleUpdateItem={editItem}
              handleDeleteItem={handleDelete}
              testId={'admin-trainers-table'}
              testCancelId={'admin-trainers-icon-delete'}
              testEditId={'admin-trainers-icon-edit'}
            />
          ) : (
            <h3>No data to retrieve</h3>
          )}
        </Container>
      )}
      {showModal && (
        <SharedModal
          show={showModal}
          title="Delete Trainer"
          body={modalMessage}
          isDelete={isConfirmationModal}
          typeStyle={typeStyle}
          closeModal={handleDeleteCancel}
          onConfirm={handleDeleteConfirmation}
          testId={'admin-trainers-modal'}
          closeTestId={'admin-trainers-button-close-success-modal'}
          confirmDeleteTestId={'admin-trainers-button-confirm-delete-modal'}
        />
      )}
    </>
  );
};

export default Trainers;
