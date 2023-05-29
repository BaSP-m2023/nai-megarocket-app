import styles from './members.module.css';
import { FaEdit } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import { FaCog } from 'react-icons/fa';

function MembersTable({
  members,
  handleRowClick,
  handleShowActionsClick,
  handleDelete,
  handleEdit,
  showActions,
  tableRef,
  editButtonRef
}) {
  return (
    <table className={styles['members-table']} ref={tableRef}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Surname</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(members) &&
          members.map((member, _id) => {
            return (
              <tr key={_id} onClick={() => handleRowClick(member)}>
                <td>{member.firstName}</td>
                <td>{member.lastName}</td>
                <td>
                  <div className="actions">
                    <i
                      className="fas fa-cog"
                      onClick={(event) => handleShowActionsClick(event, member._id)}
                    >
                      {' '}
                      <FaCog />{' '}
                    </i>
                    {showActions[member._id] && (
                      <>
                        <i className="fas fa-times" onClick={() => handleDelete(member._id)}>
                          <FaTimes />
                        </i>
                        <i
                          className="fas fa-pencil-alt"
                          onClick={() => handleEdit(member)}
                          ref={editButtonRef}
                        >
                          <FaEdit />
                        </i>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}

export default MembersTable;
