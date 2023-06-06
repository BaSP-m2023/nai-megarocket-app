import styles from './members.module.css';
import { FaEdit, FaTimes, FaCog } from 'react-icons/fa';
import { FiCircle, FiSlash } from 'react-icons/fi';

const MembersTable = ({
  members,

  handleShowActionsClick,
  handleDelete,
  handleEdit,
  showActions,
  tableRef
}) => {
  return (
    <table className={styles['members-table']} ref={tableRef}>
      <thead className={styles['table-head']} ref={tableRef}>
        <tr>
          <th>Name/Surname</th>
          <th>Email</th>
          <th>Membership</th>
          <th>Active</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(members) &&
          members.map((member, _id) => {
            return (
              <tr key={_id}>
                <td>
                  {member.firstName} {member.lastName}
                </td>
                <td>{member.email}</td>
                <td>{member.membership}</td>
                <td>
                  {member.isActive ? (
                    <FiCircle className={styles['active-icon']} />
                  ) : (
                    <FiSlash className={styles['inactive-icon']} />
                  )}
                </td>
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
                        <i className="fas fa-pencil-alt" onClick={() => handleEdit(member._id)}>
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
};

export default MembersTable;
