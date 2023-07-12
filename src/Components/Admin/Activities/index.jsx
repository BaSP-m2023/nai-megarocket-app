import { useEffect, useState } from 'react';
import SharedModal from 'Components/Shared/Modal';
import Table from 'Components/Shared/Table';
import Button from 'Components/Shared/Button';
import styles from './activities.module.css';
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
  const [isDelete, setIsDelete] = useState(false);
  const [typeStyle, setTypeStyle] = useState('');
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
    setIsDelete(true);
    setTypeStyle();
    setTitleModal('Do you want to delete this activity?');
    setBodyModal('');
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
          <div className={styles.topContainer}>
            <h2>Activities</h2>
            <Button
              text={'+ Add Activity'}
              type={'add'}
              clickAction={handleAddItem}
              testId={'admin-button-add-activity'}
            />
          </div>
          <Table
            data={activities}
            properties={['name', 'description', 'isActive']}
            columnTitles={['Name', 'Description', 'Active']}
            handleUpdateItem={handleEditItem}
            handleDeleteItem={handleDeleteClick}
            testId={'admin-activities-table'}
            testCancelId={'admin-activities-icon-delete'}
            testEditId={'admin-activities-icon-edit'}
          />
          {showModal && (
            <SharedModal
              show={showModal}
              typeStyle={typeStyle}
              title={titleModal}
              body={bodyModal}
              isDelete={isDelete}
              onConfirm={handleConfirmDelete}
              closeModal={handleCloseModal}
              testId={'admin-activities-modal'}
              confirmDeleteTestId={'admin-activities-button-confirm-modal'}
              closeTestId={'admin-activities-button-close-modal'}
            />
          )}
        </Container>
      ) : (
        <h3>There are no activities</h3>
      )}
    </>
  );
};

export default Activities;
