import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTrainers, deleteTrainer } from 'Redux/trainers/thunks';
import { useHistory } from 'react-router-dom';
import Table from 'Components/Shared/Table/index';
import ConfirmModal from 'Components/Shared/Modal/ConfirmModal';
import ClipLoader from 'react-spinners/ClipLoader';
import Container from 'Components/Shared/Container';
import toast, { Toaster } from 'react-hot-toast';

const Trainers = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [selectedTrainerId, setSelectedTrainerId] = useState(null);
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
          {!trainers ? (
            <h3>No trainers to show</h3>
          ) : trainers.length > 0 ? (
            <Table
              title={'Trainers'}
              buttonId={'admin-trainer-add-button'}
              addClick={handleAddTrainer}
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
      <ConfirmModal
        open={showModal}
        onClose={handleDeleteCancel}
        isDelete={true}
        title={'Delete Trainer'}
        body={modalMessage}
        onConfirm={handleDeleteConfirmation}
        closeTestId={'admin-button-close-success-modal'}
        id="admin-trainers-modal"
        confirmId={'admin-button-confirm-delete-modal'}
        closeId={'admin-button-close-success-modal'}
      />
    </>
  );
};

export default Trainers;
