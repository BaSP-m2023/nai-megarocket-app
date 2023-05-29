import { useEffect, useState } from 'react';
import styles from './Tables/members.module.css';
import MembersTable from './Tables/MembersTable';
import SelectedMemberInfo from './Tables/SelectedMemberInfo';
import { fetchMembers, deleteMember } from './api';
import Modal from './Modals/Modal';

function Members() {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showActions, setShowActions] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);

  useEffect(() => {
    const getMembers = async () => {
      try {
        const members = await fetchMembers();
        setMembers(members);
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    };

    getMembers();
  }, []);

  const handleDelete = async (id) => {
    setIsConfirmOpen(true);
    setMemberToDelete(id);
  };

  const handleConfirmDelete = async () => {
    setIsConfirmOpen(false);
    try {
      await deleteMember(memberToDelete);
      setMembers((prevMembers) => prevMembers.filter((member) => member._id !== memberToDelete));
      setSuccess('Member deleted successfully');
    } catch (error) {
      console.error(error);
      setError('Failed to delete member');
    }
  };

  const handleRowClick = (member) => {
    setSelectedMember(member);
    setShowActions({});
  };

  const handleShowActionsClick = (event, id) => {
    event.stopPropagation();
    setShowActions((prevShowActions) => ({
      ...prevShowActions,
      [id]: !prevShowActions[id]
    }));
  };

  const handleEdit = (member) => {
    setSelectedMember(member);
  };

  const handleClose = () => {
    setSelectedMember(null);
  };

  return (
    <section className={styles.container}>
      <h2>Members</h2>
      <MembersTable
        members={members}
        handleRowClick={handleRowClick}
        handleShowActionsClick={handleShowActionsClick}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        showActions={showActions}
      />
      <button
        onClick={() => {
          setSelectedMember(null);
        }}
      >
        Create Member
      </button>
      {selectedMember && (
        <>
          <SelectedMemberInfo selectedMember={selectedMember} />
          <button onClick={handleClose}>Close</button>
        </>
      )}
      <Modal
        isOpen={isConfirmOpen}
        closeModal={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
      >
        Do you want to delete this member?
      </Modal>
      <Modal isOpen={success !== null} closeModal={() => setSuccess(null)}>
        {success}
      </Modal>
      <Modal isOpen={error !== null} closeModal={() => setError(null)}>
        {error}
      </Modal>
    </section>
  );
}

export default Members;
