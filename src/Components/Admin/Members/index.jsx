import React, { useEffect, useState } from 'react';
import Table from 'Components/Shared/Table';
import Button from 'Components/Shared/Button';
import SharedModal from 'Components/Shared/Modal';
import styles from './members.module.css';

import { useHistory } from 'react-router-dom';
import { getMembers, deleteMember } from 'Redux/members/thunks';
import { useSelector, useDispatch } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';

const Members = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const members = useSelector((state) => state.members.data.data);
  const loading = useSelector((state) => state.members.loading);
  const [showAlert, setShowAlert] = useState(false);
  const [typeStyle, setTypeStyle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [isDelete, setIsDelete] = useState(false);
  const [title, setTitle] = useState('');

  useEffect(() => {
    dispatch(getMembers());
  }, []);

  const handleConfirmDelete = async () => {
    setIsDelete(false);
    setShowAlert(false);
    try {
      const { data } = await dispatch(deleteMember(memberToDelete));
      setAlertMessage(`Member ${data.firstName} ${data.lastName} deleted.`);
      setTitle('Success');
      setTypeStyle('success');
      setShowAlert(true);
    } catch (error) {
      setAlertMessage(error.message);
      setTitle('Error');
      setTypeStyle('error');
      setShowAlert(true);
    }
  };

  const handleDelete = (id) => {
    setMemberToDelete(id);
    setIsDelete(true);
    setTitle('Delete Member');
    setAlertMessage('Are you sure you want to delete this member?');
    setShowAlert(true);
  };

  const handleAdd = () => {
    history.push('/admin/members/form/');
  };

  const handleEdit = (id) => {
    history.push(`/admin/members/form/${id}`);
  };
  return (
    <section className={styles.membersContainer}>
      <div className={styles.membersSection}>
        <h2>Members</h2>
        <Button text={'+ Add Member'} type={'add'} clickAction={handleAdd} />
      </div>
      {loading ? (
        <ClipLoader />
      ) : members ? (
        <>
          <Table
            data={members}
            handleDeleteItem={handleDelete}
            handleUpdateItem={handleEdit}
            columnTitles={['Name', 'Surname', 'Email', 'Membership', 'Active']}
            properties={['firstName', 'lastName', 'email', 'membership', 'isActive']}
          />
          <SharedModal
            isDelete={isDelete}
            show={showAlert}
            typeStyle={typeStyle}
            closeModal={() => setShowAlert(false)}
            title={title}
            body={alertMessage}
            onConfirm={handleConfirmDelete}
          />
        </>
      ) : (
        <p>No data available.</p>
      )}
    </section>
  );
};

export default Members;
