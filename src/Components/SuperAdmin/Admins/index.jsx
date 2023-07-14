import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAdmins, deleteAdmin } from 'Redux/admins/thunks';
import styles from './admins.module.css';
import Table from 'Components/Shared/Table';
import Button from 'Components/Shared/Button';
import SharedModal from 'Components/Shared/Modal';
import ClipLoader from 'react-spinners/ClipLoader';
import Container from 'Components/Shared/Container';
import toast, { Toaster } from 'react-hot-toast';

const Admins = () => {
  const history = useHistory();
  const admins = useSelector((state) => state.admins.data);
  const isLoading = useSelector((state) => state.admins.loading);
  const [isDelete, setIsDelete] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalInformation, setModalInformation] = useState({ title: '', body: '' });
  const [isSuccess, setIsSuccess] = useState('');
  const [idAdmin, setIdAdmin] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    toast.remove();
    dispatch(getAdmins());
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

  const confirmDelete = async () => {
    if (idAdmin) {
      try {
        const data = await dispatch(deleteAdmin(idAdmin));
        showToast(data.message, 'success');
        setShowModal(false);
      } catch (error) {
        showToast(error.message, 'error');
      }
    }
  };

  const handleDeleteAdmin = (id) => {
    setIdAdmin(id);
    setModalInformation({ title: 'Warning:', body: 'Are you sure?' });
    setIsDelete(true);
    setIsSuccess('default');
    setShowModal(true);
  };

  const handleExitAlert = () => {
    setShowModal(false);
  };

  const handleAddAdmin = () => {
    history.push('/super-admins/admins/form');
  };

  const handleUpdateAdmin = (id) => {
    history.push(`/super-admins/admins/form/${id}`);
  };

  return (
    <>
      <Toaster
        containerStyle={{
          margin: '10vh 0 0 0'
        }}
      />

      {isLoading ? (
        <Container center={true}>
          <ClipLoader />
        </Container>
      ) : (
        <Container>
          <div className={styles.topAdminContainer}>
            <h2>Admins</h2>
            <Button
              testId={'super-admin-add-button'}
              text={'+ Add Admins'}
              type={'add'}
              clickAction={handleAddAdmin}
            />
          </div>
          {Array.isArray(admins) && admins.length > 0 ? (
            <>
              <Table
                data={admins}
                properties={['firstName', 'lastName', 'phone', 'email']}
                columnTitles={['First Name', 'Last Name', 'Phone Number', 'Email']}
                handleUpdateItem={handleUpdateAdmin}
                handleDeleteItem={handleDeleteAdmin}
                testId={'super-admin-table'}
                testCancelId={'super-admin-icon-delete'}
                testEditId={'super-admin-icon-edit'}
              />

              <SharedModal
                isDelete={isDelete}
                show={showModal}
                closeModal={handleExitAlert}
                typeStyle={isSuccess}
                title={modalInformation.title}
                body={modalInformation.body}
                onConfirm={confirmDelete}
                testId={'super-admin-modal'}
                confirmDeleteTestId={'super-admin-button-confirm-modal'}
                closeTestId={'super-admin-button-close-modal'}
              />
            </>
          ) : (
            <>
              {!admins ? (
                <h3>There are no admins in the database</h3>
              ) : (
                <h3>Server out of service</h3>
              )}
            </>
          )}
        </Container>
      )}
    </>
  );
};
export default Admins;
