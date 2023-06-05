import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styles from './super-admins.module.css';

const Form = () => {
  const { id } = useParams();
  const history = useHistory();
  const [superAdmins, setSuperAdmins] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [item, setItem] = useState({
    firstName: '',
    email: '',
    password: ''
  });

  const getSuperAdmins = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins`);
      const data = await response.json();
      setSuperAdmins(data.data);
    } catch (error) {
      console.error(error);
      throw new Error('An error has occurred, cannot get the Super Admins');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getSuperAdmins();
      setIsEdit(id);
      if (isEdit && !isDataLoaded) {
        const superAdmin = superAdmins.find((admin) => admin._id === id);
        if (superAdmin) {
          setItem(superAdmin);
          setIsDataLoaded(true);
        }
      }
    };
    fetchData();
  }, [id, superAdmins, isEdit, isDataLoaded]);

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
      if (!response.ok) {
        alert(data.message);
      } else {
        setSuperAdmins(data.data);
        setSuperAdmins([...superAdmins, data.data]);
        alert(data.message);
        history.push('/super-admins');
      }
    } catch (error) {
      console.error(error);
      throw new Error('An error has occurred creating the Super Admin');
    }
  };

  const updateSuperAdmin = async (id, superAdmin) => {
    try {
      const { firstName, email, password } = superAdmin;
      const updatedSuperAdmin = {
        firstName,
        email,
        password
      };
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedSuperAdmin)
      });
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
      } else {
        setSuperAdmins(
          superAdmins.map((item) => (item._id === id ? { ...item, ...updatedSuperAdmin } : item))
        );
        alert(data.message);
        history.push('/super-admins');
      }
    } catch (error) {
      console.error(error);
      throw new Error('An error has occurred updating the Super Admin');
    }
  };

  const onChange = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      updateSuperAdmin(id, item);
    } else {
      addSuperAdmin(item);
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
            value={item.firstName}
            onChange={onChange}
          />
        </div>
        <div>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <br />
          <input type="email" id="email" name="email" value={item.email} onChange={onChange} />
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
            value={item.password}
            onChange={onChange}
          />
        </div>
        <div className={styles.modalButtons}>
          <input
            className={styles.modalButton}
            type="submit"
            value={isEdit ? 'Update' : 'Create'}
          />
          <button className={styles.modalButton} onClick={handleCancel}>
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
