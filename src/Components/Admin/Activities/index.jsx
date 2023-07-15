import { useEffect, useState } from 'react';
import ConfirmModal from 'Components/Shared/Modal/ConfirmModal';
import Table from 'Components/Shared/Table';
import { useHistory } from 'react-router-dom';
import { getActivities, deleteActivities } from 'Redux/activities/thunks';
import { useSelector, useDispatch } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';
import Container from 'Components/Shared/Container';
import toast, { Toaster } from 'react-hot-toast';

const Activities = () => {
  const history = useHistory();
  const [activityId, setActivityId] = useState();
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [bodyModal, setBodyModal] = useState('');
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.activities.loading);
  const activities = useSelector((state) => state.activities.data.data);

  useEffect(() => {
    toast.remove();
    dispatch(getActivities());
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

  const handleAddItem = () => {
    history.push('activities/form');
  };

  const handleDeleteClick = (id) => {
    setActivityId(id);
    setTitleModal('Delete Activity');
    setBodyModal('Are you sure you want to delete this activity?');
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const data = await dispatch(deleteActivities(activityId));
      showToast(data.message, 'success');
      setShowModal(false);
    } catch (error) {
      showToast(error.message, 'error');
      setShowModal(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleEditItem = (id) => {
    history.push(`activities/form/${id}`);
  };

  return (
    <>
      <Toaster
        containerStyle={{
          margin: '10vh 0 0 0'
        }}
      />

      {loading ? (
        <Container center={true}>
          <ClipLoader />
        </Container>
      ) : activities ? (
        <Container>
          <Table
            title={'Activities'}
            buttonId={'admin-button-add-activity'}
            addClick={handleAddItem}
            data={activities}
            properties={['name', 'description', 'isActive']}
            columnTitles={['Name', 'Description', 'Active']}
            handleUpdateItem={handleEditItem}
            handleDeleteItem={handleDeleteClick}
            testId={'admin-activities-table'}
            testCancelId={'admin-activities-icon-delete'}
            testEditId={'admin-activities-icon-edit'}
          />
          <ConfirmModal
            open={showModal}
            onClose={handleCloseModal}
            isDelete={true}
            title={titleModal}
            body={bodyModal}
            onConfirm={handleConfirmDelete}
            id="admin-activities-modal"
            confirmId={'admin-button-confirm-modal'}
            closeId={'admin-button-close-modal'}
          />
        </Container>
      ) : (
        <h3>There are no activities</h3>
      )}
    </>
  );
};

export default Activities;
