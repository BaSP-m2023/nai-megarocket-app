import React from 'react';
import { useState } from 'react';
import styles from './super-admins.module.css';

const FormEdit = (props) => {
  if (!props.showEditForm) {
    return null;
  }
  const actualSuperAdmin = props.data.filter((item) => item._id === props.superAdminId);
  const [superAdmin, setSuperAdmin] = useState({
    firstName: actualSuperAdmin[0].firstName,
    email: actualSuperAdmin[0].email,
    password: actualSuperAdmin[0].password
  });

  const onChange = (e) => {
    setSuperAdmin({
      ...superAdmin,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    props.editSuperAdmin(props.superAdminId, superAdmin);
    props.closeEditForm();
  };

  return (
    <div className={styles.modalContainer}>
      <form className={styles.modalContent} onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <br />
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={superAdmin.firstName}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            id="email"
            name="email"
            value={superAdmin.email}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            id="password"
            name="password"
            value={superAdmin.password}
            onChange={onChange}
          />
        </div>
        <div className={styles.modalButtons}>
          <input className={styles.modalButton} type="submit" value="Edit" />
          <button className={styles.modalButton} onClick={props.closeEditForm}>
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormEdit;
