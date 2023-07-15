import React, { useEffect, useState } from 'react';
import styles from './subscriptions.module.css';
import Table from 'Components/Shared/Table/index';
import { useHistory } from 'react-router-dom';
import SharedModal from 'Components/Shared/Modal/index';
import Button from 'Components/Shared/Button/index';
import { useSelector, useDispatch } from 'react-redux';
import { getSubscriptions, deleteSubscription } from 'Redux/subscriptions/thunks';
import ClipLoader from 'react-spinners/ClipLoader';
import Container from 'Components/Shared/Container';
import { FaHistory } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

const Subscriptions = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.subscriptions.loading);
  const subscriptions = useSelector((state) => state.subscriptions.data);
  const [showModal, setShowModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [titleModal, setTitleModal] = useState('');
  const [bodyModal, setBodyModal] = useState('');
  const [subscriptionId, setSubscriptionId] = useState('');
  const [showInactive, setShowInactive] = useState(false);
  const [showButtons, setShowButtons] = useState(true);

  useEffect(() => {
    toast.remove();
    dispatch(getSubscriptions());
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

  const handleAdd = () => {
    history.push('/admins/subscriptions/form');
  };

  const handleEdit = (_id) => {
    history.push(`/admins/subscriptions/form/${_id}`);
  };

  const handleDeleteSubscription = (id) => {
    setSubscriptionId(id);
    setIsDelete(true);
    setTitleModal('Delete subscription');
    setBodyModal('Do you want to delete this subscription?');
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const data = await dispatch(deleteSubscription(subscriptionId));
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

  const handleToggleInactive = () => {
    setShowInactive(!showInactive);
    setShowButtons(!showButtons);
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
      ) : subscriptions && subscriptions.length > 0 ? (
        <Container>
          <div className={styles.buttonContainer}>
            <h2>{showInactive ? 'Subscriptions history' : 'Subscriptions'}</h2>

            <div className={styles.buttons}>
              {showButtons && (
                <Button
                  text={'+ Add Subscription'}
                  type={'add'}
                  clickAction={handleAdd}
                  testId={'admin-add-button'}
                />
              )}
              <div className={styles.iconContainer}>
                <button
                  onClick={handleToggleInactive}
                  className={`${styles.toggleButton} ${showInactive ? styles.active : ''}`}
                  id="admin-toggle-inactive-button"
                >
                  {showInactive ? <FaHistory /> : <FaHistory />}
                </button>
              </div>
            </div>
          </div>

          <Table
            data={
              showInactive
                ? subscriptions
                : subscriptions.filter((subscription) => subscription.isActive)
            }
            properties={[
              'member.firstName',
              'member.lastName',
              'classes.activity.name',
              'date',
              'isActive'
            ]}
            columnTitles={['First Name', 'Last Name', 'Class Name', 'Date', 'Active']}
            handleUpdateItem={handleEdit}
            handleDeleteItem={handleDeleteSubscription}
            testId={'admin-table'}
            testCancelId={'admin-icon-delete'}
            testEditId={'admin-icon-edit'}
            showButtons={showButtons}
            showNumberColumn={!showButtons}
            showOrderButton={true}
          />

          {showModal && (
            <SharedModal
              show={showModal}
              title={titleModal}
              body={bodyModal}
              isDelete={isDelete}
              onConfirm={handleConfirmDelete}
              closeModal={handleCloseModal}
              testId={'admin-modal'}
              closeTestId={'admin-button-close-success-modal'}
              confirmDeleteTestId={'admin-button-confirm-delete-modal'}
            />
          )}
        </Container>
      ) : (
        <Container center={true}>
          <h3>There are no subscriptions in the database</h3>
        </Container>
      )}
    </>
  );
};

export default Subscriptions;
