import React from 'react';
import { useState, useEffect } from 'react';
import styles from './super-admins.module.css';

const Form = (props) => {
  if (!props.showForm) {
    return null;
  }

  const [superAdmin, setSuperAdmin] = useState({
    firstName: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    if (props.method === 'PUT') {
      const actualSuperAdmin = props.data.filter((item) => item._id === props.itemId);
      setSuperAdmin({
        firstName: actualSuperAdmin[0].firstName,
        email: actualSuperAdmin[0].email,
        password: actualSuperAdmin[0].password
      });
    }
  }, [props.method, props.data, props.itemId]);

  const onChange = (e) => {
    setSuperAdmin({
      ...superAdmin,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (props.method === 'PUT') {
      props.updateItem(props.itemId, superAdmin);
    } else {
      props.addItem(superAdmin);
    }
  };

  return (
    <div className={styles.modalContainer}>
      <form className={styles.modalContent} onSubmit={onSubmit}>
        <div>
          <label className={styles.label} htmlFor="name">
            Name
          </label>
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
          <label className={styles.label} htmlFor="email">
            Email
          </label>
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
          <label className={styles.label} htmlFor="password">
            Password
          </label>
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
          <input className={styles.modalButton} type="submit" value="Send" />
          <button className={styles.modalButton} onClick={props.closeForm}>
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
