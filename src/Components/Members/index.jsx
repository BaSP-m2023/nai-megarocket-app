import { useEffect, useState } from 'react';
import styles from './Tables/members.module.css';
import MembersTable from './Tables/memberTable';
import Modal from './Modals/modalMember';
import { useHistory } from 'react-router-dom';

const Members = () => {
  const history = useHistory();
  const [members, setMembers] = useState([]);
  const [showActions, setShowActions] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);

  useEffect(() => {
    getMembers();
  }, []);

  const deleteMember = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/members/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('An error occurred while trying to delete the member');
      }
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
    setIsConfirmOpen(true);
    setMemberToDelete(id);
  };

  const handleConfirmDelete = async () => {
    setIsConfirmOpen(false);
    try {
      await deleteMember(memberToDelete);
      setMembers((prevMembers) => prevMembers.filter((member) => member._id !== memberToDelete));
      setSuccessMessage('Member deleted successfully');
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to delete member');
    }
  };

  const handleShowActionsClick = (event, id) => {
    event.stopPropagation();
    setShowActions((prevShowActions) => ({
      ...prevShowActions,
      [id]: !prevShowActions[id]
    }));
  };

  const handleEdit = (id) => {
    history.push(`/members/form/${id}`);
  };

  return (
    <section className={styles.container}>
      <h2>Members</h2>
      <MembersTable
        members={members}
        handleShowActionsClick={handleShowActionsClick}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        showActions={showActions}
      />

      <button
        className={styles['create-button']}
        onClick={() => {
          history.push('/members/form/');
        }}
      >
        Create Member
      </button>

      <Modal
        isOpen={isConfirmOpen}
        closeModal={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
      >
        Do you want to delete this member?
      </Modal>
      <Modal isOpen={successMessage !== null} closeModal={() => setSuccessMessage(null)}>
        {successMessage}
      </Modal>
      <Modal isOpen={errorMessage !== null} closeModal={() => setErrorMessage(null)}>
        {errorMessage}
      </Modal>
    </section>
  );
};

export default Members;
