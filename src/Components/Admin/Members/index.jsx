import React, { useEffect, useState } from 'react';
import Table from 'Components/Shared/Table';
import Button from 'Components/Shared/Button';
import SharedModal from 'Components/Shared/Modal';
import styles from './members.module.css';
import { useHistory } from 'react-router-dom';
import { getMembers, deleteMember } from 'Redux/members/thunks';
import { useSelector, useDispatch } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';
import Container from 'Components/Shared/Container';
import toast, { Toaster } from 'react-hot-toast';

const Members = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const members = useSelector((state) => state.members.data.data);
  const loading = useSelector((state) => state.members.loading);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [isDelete, setIsDelete] = useState(false);
  const [title, setTitle] = useState('');

  useEffect(() => {
    dispatch(getMembers());
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

  const handleConfirmDelete = async () => {
    setIsDelete(false);
    setShowAlert(false);
    try {
      const data = await dispatch(deleteMember(memberToDelete));
      showToast(data.message, 'success');
      setShowAlert(false);
    } catch (error) {
      showToast(error.message, 'error');
      setShowAlert(false);
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
    history.push('/admins/members/form/');
  };

  const handleEdit = (id) => {
    history.push(`/admins/members/form/${id}`);
  };
  return (
    <Container>
      <Toaster
        containerStyle={{
          margin: '10vh 0 0 0'
        }}
      />
      <div className={styles.membersSection}>
        <h2>Members</h2>
        <Button
          text={'+ Add Member'}
          type={'add'}
          clickAction={handleAdd}
          testId={'admin-members-add-button'}
        />
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
            testId={'admin-member-table'}
            testCancelId={'admin-member-icon-delete'}
            testEditId={'admin-member-icon-edit'}
          />
          <SharedModal
            isDelete={isDelete}
            show={showAlert}
            closeModal={() => setShowAlert(false)}
            title={title}
            body={alertMessage}
            onConfirm={handleConfirmDelete}
            testId={'admin-member-modal'}
            closeTestId={'admin-member-button-close-success-modal'}
          />
        </>
      ) : (
        <p>No data available.</p>
      )}
    </Container>
  );
};

export default Members;
