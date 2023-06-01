import React from 'react';
import { useState, useEffect } from 'react';
import styles from './super-admins.module.css';

const Form = (props) => {
  if (!props.showForm) {
    return null;
  }

  const isPut = props.method === 'PUT';

  const [item, setItem] = useState({
    firstName: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    if (isPut) {
      const item = props.data.filter((item) => item._id === props.itemId);
      setItem({
        firstName: item[0].firstName,
        email: item[0].email,
        password: item[0].password
      });
    }
  }, [props.method, props.data, props.itemId, isPut]);

  const onChange = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    isPut ? props.updateItem(props.itemId, item) : props.addItem(item);
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
          <input className={styles.modalButton} type="submit" value={isPut ? 'Edit' : 'Add'} />
          <button className={styles.modalButton} onClick={props.closeForm}>
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
