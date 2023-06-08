import React, { useEffect, useState } from 'react';
import styles from './subscriptions.module.css';
import Table from '../Shared/Table/index';
import { useHistory } from 'react-router-dom';
import SharedModal from '../Shared/Modal/index';
import Button from '../Shared/Button/index';

const Subscriptions = () => {
  const history = useHistory();
  const [subscriptions, setSubscriptions] = useState([]);
  const [showWarning, setShowWarning] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  /*   const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false); */
  /*   const [successMessage, setSuccessMessage] = useState(''); */

  const getSubscriptions = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions`);
      if (!response.ok) {
        throw new Error('Failed to get subscriptions');
      }
      const { data } = await response.json();
      setAlertMessage(data.message);
      setSubscriptions(data);
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteSubscription = async (id) => {
    setShowWarning(false);
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/subscriptions/${id}`, {
        method: 'DELETE'
      });
      setSubscriptions(subscriptions.filter((subscription) => subscription._id !== id));
      getSubscriptions();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = () => {
    history.push('/subscriptions/form');
  };

  const handleEdit = (id) => {
    history.push(`/subscriptions/form/${id}`);
  };

  const handleDelete = (id) => {
    deleteSubscription(id);
  };

  useEffect(() => {
    getSubscriptions();
  }, []);

  return (
    <section className={styles.container}>
      {/*       <Modal
        show={showDeleteModal}
        title="Confirm Deletion"
        message="Are you sure you want to delete this subscription?"
        confirmText="Delete"
        onConfirm={handleDelete}
        closeModal={() => setShowDeleteModal(false)}
        showCancel={true}
      />
      <Modal
        show={showEditModal}
        title="Edit Subscription"
        message="Edit subscription details"
        confirmText="Save"
        onConfirm={handleEdit}
        closeModal={() => setShowEditModal(false)}
        showCancel={true}
      />
      <Modal
        show={successMessage !== ''}
        title="Success"
        message={successMessage}
        confirmText="OK"
        onConfirm={() => setSuccessMessage('')}
        closeModal={() => setSuccessMessage('')}
        showCancel={false}
      /> */}

      <div className={styles.buttonContainer}>
        <h2>Subscriptions</h2>
        {/*         <button className={styles.addSubs} onClick={handleAdd}>
          Add New Subscription
        </button> */}
        <Button text={'+ Add New Subscription'} type={'add'} clickAction={handleAdd} />
      </div>
      <Table
        data={subscriptions || []}
        properties={['member.firstName', 'member.lastName', 'classes.activity.name']}
        columnTitles={['First Name', 'Last Name', 'Class Name']}
        handleUpdateItem={handleEdit}
        handleDeleteItem={() => setShowWarning(true)}
      />
      <SharedModal
        isDelete={false}
        show={showWarning}
        closeModal={() => setShowWarning(false)}
        title={'Delete subscription'}
        body={'Are you sure you want to delete this subscription?'}
        onConfirm={handleDelete}
      />
      <SharedModal
        isDelete={false}
        show={showAlert}
        typeStyle={isSuccess ? 'success' : 'error'}
        closeModal={() => setShowAlert(false)}
        title={isSuccess ? 'Success' : 'Error'}
        body={alertMessage}
      />
    </section>
  );
};

export default Subscriptions;
