import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAdmins, deleteAdmin } from 'Redux/admins/thunks';
import styles from './admins.module.css';
import Table from 'Components/Shared/Table';
import Button from 'Components/Shared/Button';
import SharedModal from 'Components/Shared/Modal';
import ClipLoader from 'react-spinners/ClipLoader';

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
    dispatch(getAdmins());
  }, []);

  const confirmDelete = async () => {
    if (idAdmin) {
      try {
        const data = await dispatch(deleteAdmin(idAdmin));
        setModalInformation({ title: 'Success:', body: data.message });
        setIsSuccess('success');
        setShowModal(true);
        setIsDelete(false);
      } catch (error) {
        setModalInformation({ title: 'Error:', body: error.message });
        setIsDelete(false);
        setIsSuccess('error');
        setShowModal(true);
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
    history.push('/super-admin/admins/form');
  };

  const handleUpdateAdmin = (id) => {
    history.push(`/super-admin/admins/form/${id}`);
  };

  return (
    <section className={styles.adminContainer}>
      <div className={styles.topAdminContainer}>
        <h2>Admins</h2>
        <Button text={'+ Add Admins'} type={'add'} clickAction={handleAddAdmin} />
      </div>
      {isLoading ? (
        <ClipLoader />
      ) : (
        <>
          {Array.isArray(admins) && admins.length > 0 ? (
            <>
              <Table
                data={admins}
                properties={['firstName', 'lastName', 'phone', 'email']}
                columnTitles={['First Name', 'Last Name', 'Phone Number', 'Email']}
                handleUpdateItem={handleUpdateAdmin}
                handleDeleteItem={handleDeleteAdmin}
              />

              <SharedModal
                isDelete={isDelete}
                show={showModal}
                closeModal={handleExitAlert}
                typeStyle={isSuccess}
                title={modalInformation.title}
                body={modalInformation.body}
                onConfirm={confirmDelete}
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
        </>
      )}
    </section>
  );
};
export default Admins;
