import React, { useEffect, useState } from 'react';
import Table from '../Shared/Table';
import Button from '../Shared/Button';
import SharedModal from '../Shared/Modal';
import styles from './members.module.css';

import { useHistory } from 'react-router-dom';
import { getMembers, deleteMember } from '../../Redux/members/thunks';
import { useSelector, useDispatch } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';

const Members = () => {
  const history = useHistory();
  const members = useSelector((state) => state.members.data.data);
  const loading = useSelector((state) => state.members.loading);
  const [showWarning, setShowWarning] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMembers());
  }, [showTable]);

  const handleConfirmDelete = async () => {
    setShowWarning(false);
    try {
      const data = await dispatch(deleteMember(memberToDelete));
      setAlertMessage(data.message);
      setIsSuccess(true);
      setShowAlert(true);
      setShowTable(true);
    } catch (error) {
      setAlertMessage(error.message);
      setIsSuccess(false);
      setShowAlert(true);
    }
  };

  const handleDelete = (id) => {
    setShowWarning(true);
    setMemberToDelete(id);
  };

  const handleAdd = () => {
    history.push('/members/form/');
  };

  const handleEdit = (id) => {
    history.push(`/members/form/${id}`);
  };

  return (
    <section className={styles.membersContainer}>
      <div className={styles.membersSection}>
        <h2>Members</h2>
        <Button text={'+ Add Member'} type={'add'} clickAction={handleAdd} />
      </div>
      {loading ? (
        <ClipLoader />
      ) : members && members.length >= 0 ? (
        <>
          <Table
            data={members}
            handleDeleteItem={handleDelete}
            handleUpdateItem={handleEdit}
            columnTitles={['Name', 'Surname', 'Email', 'Membership', 'Active']}
            properties={['firstName', 'lastName', 'email', 'membership', 'isActive']}
          />
          <SharedModal
            isDelete={true}
            show={showWarning}
            closeModal={() => setShowWarning(false)}
            title={'Delete Member'}
            body={'Are you sure you want to delete this member?'}
            onConfirm={handleConfirmDelete}
          />
          <SharedModal
            isDelete={false}
            show={showAlert}
            typeStyle={isSuccess ? 'success' : 'error'}
            closeModal={() => setShowAlert(false)}
            title={isSuccess ? 'Success' : 'Error'}
            body={alertMessage}
          />
        </>
      ) : (
        <p>No data available.</p>
      )}
    </section>
  );
};

export default Members;
