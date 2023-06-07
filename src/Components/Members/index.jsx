import { useEffect, useState } from 'react';
import Table from '../Shared/Table';
import Button from '../Shared/Button';
import SharedModal from '../Shared/Modal';
import { useHistory } from 'react-router-dom';

const Members = () => {
  const history = useHistory();
  const [members, setMembers] = useState([]);
  const [showWarning, setShowWarning] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [memberToDelete, setMemberToDelete] = useState(null);

  useEffect(() => {
    getMembers();
  }, []);

  const deleteMember = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/members/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (!response.ok) {
        setAlertMessage(data.message);
        setShowAlert(true);
        setIsSuccess(false);
      }
      setAlertMessage(data.message);
      setIsSuccess(true);
      console.log(data);
      setShowAlert(true);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getMembers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/members`);
      const data = await response.json();
      setMembers(data.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleDelete = (id) => {
    setShowWarning(true);
    setMemberToDelete(id);
  };

  const handleConfirmDelete = async () => {
    setShowWarning(false);
    try {
      await deleteMember(memberToDelete);
      setMembers((prevMembers) => prevMembers.filter((member) => member._id !== memberToDelete));
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = () => {
    history.push('/members/form/');
  };

  const handleEdit = (id) => {
    history.push(`/members/form/${id}`);
  };

  return (
    <section>
      <h2>Members</h2>
      <Button text={'+ Add Member'} type={'add'} clickAction={handleAdd} />
      {members.length !== 0 ? (
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
            closeModal={() => setShowAlert(false)}
            title={isSuccess ? 'Success' : 'Error'}
            body={alertMessage}
          />
        </>
      ) : (
        <h3>There are no Members in the database</h3>
      )}
    </section>
  );
};

export default Members;
