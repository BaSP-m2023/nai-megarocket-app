import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styles from './super-admins.module.css';

const Form = () => {
  const { id } = useParams();
  const history = useHistory();
  const [superAdmin, setSuperAdmin] = useState({
    firstName: '',
    email: '',
    password: ''
  });

  const getSuperAdminById = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/${id}`, {
        method: 'GET'
      });
      const { data } = await response.json();
      setSuperAdmin({ firstName: data.firstName, email: data.email, password: data.password });
    } catch (error) {
      console.error(error);
    }
  };

  const addSuperAdmin = async (superAdmin) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(superAdmin)
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setSuperAdmin({
          firstName: '',
          email: '',
          password: ''
        });
        handleCancel();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      throw new Error('An error has occurred creating the Super Admin');
    }
  };

  const updateSuperAdmin = async (id, superAdmin) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(superAdmin)
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        handleCancel();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      throw new Error('An error has occurred updating the Super Admin');
    }
  };

  useEffect(() => {
    if (id) {
      getSuperAdminById(id);
    }
  }, []);

  const onChange = (e) => {
    setSuperAdmin({
      ...superAdmin,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (id) {
      updateSuperAdmin(id, superAdmin);
    } else {
      addSuperAdmin(superAdmin);
    }
  };

  const handleCancel = () => {
    history.push('/super-admins');
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label className={styles.label} htmlFor="firstName">
            Name
          </label>
          <br />
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={superAdmin.firstName}
            onChange={onChange}
            required
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
            required
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
          <button className={styles.modalButton} onClick={onSubmit}>
            {id ? <p>Submit</p> : <p>Confirm</p>}
          </button>
          <button className={styles.modalButton} onClick={handleCancel}>
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
