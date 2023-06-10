import { useEffect, useState } from 'react';
import Table from '../Shared/Table';
import Button from '../Shared/Button';
import SharedModal from '../Shared/Modal';
import styles from './members.module.css';

import { useHistory } from 'react-router-dom';
import { getMembers, deleteMember } from '../redux/members/thunks';
import { useSelector, useDispatch } from 'react-redux';

const Members = () => {
  const history = useHistory();
  const members = useSelector((state) => state.members.data.data);
  const [showWarning, setShowWarning] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [memberToDelete, setMemberToDelete] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMembers());
  }, []);

  const handleConfirmDelete = async () => {
    setShowWarning(false);
    try {
      const response = await dispatch(deleteMember(memberToDelete));
      const data = response.data;
      setAlertMessage(data.message);
      setIsSuccess(false);
      setShowAlert(true);
      console.log(data);
    } catch (error) {
      setAlertMessage(error.message);
      setIsSuccess(true);
      setShowAlert(true);
      console.log(error);
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
    </section>
  );
};

export default Members;
