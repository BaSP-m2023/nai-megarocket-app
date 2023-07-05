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

const Subscriptions = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.subscriptions.loading);
  const subscriptions = useSelector((state) => state.subscriptions.data);
  const [showModal, setShowModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [typeStyle, setTypeStyle] = useState('');
  const [titleModal, setTitleModal] = useState('');
  const [bodyModal, setBodyModal] = useState('');
  const [subscriptionId, setSubscriptionId] = useState('');
  useEffect(() => {
    dispatch(getSubscriptions());
  }, []);

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
      setTitleModal('Success');
      setBodyModal(data.message);
      setTypeStyle('success');
      setIsDelete(false);
      setShowModal(true);
    } catch (error) {
      setBodyModal(error.message);
      setTitleModal('error');
      setTypeStyle('error');
      setIsDelete(false);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container>
      <div className={styles.buttonContainer}>
        <h2>Subscriptions</h2>
        <Button
          text={'+ Add Subscription'}
          type={'add'}
          clickAction={handleAdd}
          testId={'admin-subscriptions-add-button'}
        />
      </div>
      {loading && subscriptions.length > 0 ? (
        <ClipLoader />
      ) : subscriptions && subscriptions.length > 0 ? (
        <>
          <Table
            data={subscriptions}
            properties={[
              'member.firstName',
              'member.lastName',
              'classes.activity.name',
              'isActive'
            ]}
            columnTitles={['First Name', 'Last Name', 'Class Name', 'Active']}
            handleUpdateItem={handleEdit}
            handleDeleteItem={handleDeleteSubscription}
            testId={'admin-subscriptions-table'}
            testCancelId={'admin-subscriptions-icon-delete'}
            testEditId={'admin-subscriptions-icon-edit'}
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
              testId={'admin-subscriptions-modal'}
              closeTestId={'admin-subscriptions-button-close-success-modal'}
              confirmDeleteTestId={'admin-subscriptions-button-confirm-delete-modal'}
            />
          )}
        </>
      ) : (
        <h3>There are no subscriptions in the database</h3>
      )}
    </Container>
  );
};

export default Subscriptions;
