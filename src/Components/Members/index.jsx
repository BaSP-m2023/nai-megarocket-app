import { useEffect, useState } from 'react';
import styles from './Tables/members.module.css';
import MembersTable from './Tables/memberTable';
import SelectedMemberInfo from './Tables/selectedInfoMember';
import api from './api';
import Modal from './Modals/modalMember';

const { fetchMembers, deleteMember } = api;

function Members() {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showActions, setShowActions] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);

  async function getMembers() {
    try {
      const members = await fetchMembers();
      setMembers(members);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  }

  useEffect(() => {
    getMembers();
  }, []);

  const handleDelete = (id) => {
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

  const handleShowInfo = (member) => {
    setSelectedMember(member);
  };

  const handleShowActionsClick = (event, id) => {
    event.stopPropagation();
    setShowActions((prevShowActions) => ({
      ...prevShowActions,
      [id]: !prevShowActions[id]
    }));
  };

  return (
    <section className={styles.container}>
      <h2>Members</h2>
      <MembersTable
        members={members}
        handleShowInfo={handleShowInfo}
        handleShowActionsClick={handleShowActionsClick}
        handleDelete={handleDelete}
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
          <button onClick={() => setSelectedMember(null)}>Close</button>
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
