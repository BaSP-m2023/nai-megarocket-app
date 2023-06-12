import React, { useEffect, useState } from 'react';
import styles from './subscriptions.module.css';
import Table from '../Shared/Table/index';
import { useHistory } from 'react-router-dom';
import SharedModal from '../Shared/Modal/index';
import Button from '../Shared/Button/index';
import { useSelector, useDispatch } from 'react-redux';
import { getSubscriptions, deleteSubscription } from '../../Redux/subscriptions/thunks';
import ClipLoader from 'react-spinners/ClipLoader';

const Subscriptions = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.subscriptions.loading);
  const subscriptions = useSelector((state) => state.subscriptions.data.data);
  const [reload, setReload] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [typeStyle, setTypeStyle] = useState('');
  const [titleModal, setTitleModal] = useState('');
  const [bodyModal, setBodyModal] = useState('');
  const [subscriptionId, setSubscriptionId] = useState('');

  useEffect(() => {
    dispatch(getSubscriptions());
    setReload(false);
  }, [reload]);

  const handleAdd = () => {
    history.push('/subscriptions/form');
  };

  const handleEdit = (id) => {
    history.push(`/subscriptions/form/${id}`);
  };

  const handleDeleteSubscription = (id) => {
    setSubscriptionId(id);
    setIsDelete(true);
    setTypeStyle();
    setTitleModal('Do you want to delete this subscription?');
    setBodyModal('');
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const data = await dispatch(deleteSubscription(subscriptionId));
      setTitleModal('Success');
      setBodyModal(data.msg);
      setTypeStyle('success');
      setIsDelete(false);
      setReload(true);
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
    <section className={styles.subscriptionContainer}>
      <div className={styles.buttonContainer}>
        <h2>Subscriptions</h2>
        <Button text={'+ Add Subscription'} type={'add'} clickAction={handleAdd} />
      </div>
      {loading ? (
        <ClipLoader />
      ) : subscriptions && subscriptions.length !== 0 ? (
        <>
          <Table
            data={subscriptions || []}
            properties={['member.firstName', 'member.lastName', 'classes.activity.name']}
            columnTitles={['First Name', 'Last Name', 'Class Name']}
            handleUpdateItem={handleEdit}
            handleDeleteItem={handleDeleteSubscription}
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
            />
          )}
        </>
      ) : (
        <h3>There are no subscriptions in the database</h3>
      )}
    </section>
  );
};

export default Subscriptions;
