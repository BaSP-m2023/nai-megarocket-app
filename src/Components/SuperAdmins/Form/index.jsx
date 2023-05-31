import React from 'react';
import { useState } from 'react';
import styles from './super-admins.module.css';

const Form = (props) => {
  if (!props.showCreateForm) {
    return null;
  }
  const [superAdmin, setSuperAdmin] = useState({
    firstName: '',
    email: '',
    password: ''
  });

  const onChange = (e) => {
    setSuperAdmin({
      ...superAdmin,
      [e.target.name]: e.target.value
    });
  };

  const onSubmitPost = (e) => {
    e.preventDefault();
    props.addSuperAdmin(superAdmin);
    props.closeCreateForm();
  };

  return (
    <div className={styles.modalContainer}>
      <form className={styles.modalContent} onSubmit={onSubmitPost}>
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
          <input className={styles.modalButton} type="submit" value="Create" />
          <button className={styles.modalButton} onClick={props.closeCreateForm}>
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
