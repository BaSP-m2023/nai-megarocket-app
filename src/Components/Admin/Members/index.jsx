import React, { useEffect, useState } from 'react';
import Table from 'Components/Shared/Table';
import { useHistory } from 'react-router-dom';
import { getMembers, deleteMember } from 'Redux/members/thunks';
import { useSelector, useDispatch } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';
import Container from 'Components/Shared/Container';
import toast, { Toaster } from 'react-hot-toast';
import ConfirmModal from 'Components/Shared/Modal/ConfirmModal';

const Members = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const members = useSelector((state) => state.members.data.data);
  const loading = useSelector((state) => state.members.loading);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [title, setTitle] = useState('');

  useEffect(() => {
    toast.remove();
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

  const membersData = Array.isArray(members)
    ? members
        ?.filter((item) => item.isActive === true)
        ?.map((item) => ({
          ...item,
          name: `${item.firstName} ${item.lastName}`
        }))
    : [];
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
      ) : members ? (
        <Container>
          <Table
            title={'Members'}
            buttonId={'admin-add-button'}
            addClick={handleAdd}
            data={membersData}
            handleDeleteItem={handleDelete}
            handleUpdateItem={handleEdit}
            columnTitles={['Name', 'Email', 'Membership', 'Active']}
            properties={['name', 'email', 'membership', 'isActive']}
            testId={'admin-table'}
            testCancelId={'admin-icon-delete'}
            testEditId={'admin-icon-edit'}
          />
          <ConfirmModal
            open={showAlert}
            onClose={() => setShowAlert(false)}
            isDelete={true}
            title={title}
            body={alertMessage}
            onConfirm={handleConfirmDelete}
            id="admin-confirm-modal"
            confirmId={'admin-button-confirm-delete-modal'}
            closeId={'admin-button-close-modal'}
          />
        </Container>
      ) : (
        <p>No data available.</p>
      )}
    </>
  );
};

export default Members;
