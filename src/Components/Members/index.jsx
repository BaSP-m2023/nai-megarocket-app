import { useEffect, useState } from 'react';
import styles from './Tables/members.module.css';
import MembersTable from './Tables/memberTable';
import SelectedMemberInfo from './Tables/selectedInfoMember';
import MemberForm from './FormMembers';
import Modal from './Modals/modalMember';
import api from './api';

const { fetchMembers, deleteMember, updateMember, createMember } = api;

const Members = () => {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [memberToEdit, setMemberToEdit] = useState(null);
  const [showActions, setShowActions] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);

  const getMembers = async () => {
    try {
      const members = await fetchMembers();
      setMembers(members);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

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
    setMemberToEdit(member);
    setShowForm(true);
  };

  const handleUpdate = async (member) => {
    try {
      await updateMember(member);
      setMembers((prevMembers) =>
        prevMembers.map((prevMember) => (prevMember._id === member._id ? member : prevMember))
      );
      setSuccess('Member updated successfully');
    } catch (error) {
      console.error(error);
      setError('Failed to update member');
    }
    setShowForm(false);
  };

  const handleFormSubmit = async (member) => {
    if (memberToEdit) {
      handleUpdate(member);
    } else {
      try {
        const newMember = await createMember(member);
        setMembers((prevMembers) => [...prevMembers, newMember]);
        setSuccess('Member created successfully');
      } catch (error) {
        console.error(error);
        setError('Failed to create member');
      }
    }
    setShowForm(false);
  };

  const handleClose = () => {
    setSelectedMember(null);
  };

  return (
    <section className={styles.container}>
      <h2>Members</h2>
      <MembersTable
        members={members}
        handleShowInfo={handleShowInfo}
        handleShowActionsClick={handleShowActionsClick}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        showActions={showActions}
      />
      <button
        className={styles['create-button']}
        onClick={() => {
          setMemberToEdit(null);
          setShowForm(true);
        }}
      >
        Create Member
      </button>
      {showForm && (
        <MemberForm
          onSubmit={handleFormSubmit}
          member={memberToEdit}
          onCancel={() => setShowForm(false)}
        />
      )}
      {selectedMember && !showForm && (
        <>
          <SelectedMemberInfo selectedMember={selectedMember} />
          <button className={styles['button-info']} onClick={handleClose}>
            Close
          </button>
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
};

export default Members;
