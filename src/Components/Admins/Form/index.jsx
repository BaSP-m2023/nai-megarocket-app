import React, { useState, useEffect } from 'react';
import styles from './form.module.css';

const Form = ({ postAdminForm, putAdminForm, bodyEdit }) => {
  const [firstName, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dni, setDNI] = useState('');
  const [phone, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (bodyEdit.length !== 0) {
      setName(bodyEdit.firstName);
      setLastName(bodyEdit.lastName);
      setDNI(bodyEdit.dni);
      setPhoneNumber(bodyEdit.phone);
      setEmail(bodyEdit.email);
      setCity(bodyEdit.city);
      setPassword(bodyEdit.password);
    }
  }, [bodyEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      firstName,
      lastName,
      dni,
      phone,
      email,
      city,
      password
    };
    if (bodyEdit.length !== 0) {
      putAdminForm(formData);
    } else {
      postAdminForm(formData);
    }
    /* bodyEdit.length !== 0 ? putAdminForm(formData) : postAdminForm(formData);*/
    cleanForm();
  };

  const cleanForm = () => {
    setName('');
    setLastName('');
    setDNI('');
    setPhoneNumber('');
    setEmail('');
    setCity('');
    setPassword('');
  };

  return (
    <form className={styles.container}>
      <div>
        <h3 className={styles.h3}>Name</h3>
        <input
          type="text"
          value={firstName}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <h3 className={styles.h3}>Last Name</h3>
        <input
          type="text"
          value={lastName}
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <div>
        <h3 className={styles.h3}>DNI</h3>
        <input
          type="number"
          value={dni}
          placeholder="DNI"
          onChange={(e) => setDNI(e.target.value)}
          required
        />
      </div>
      <div>
        <h3 className={styles.h3}>Phone</h3>
        <input
          type="number"
          value={phone}
          placeholder="Phone"
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>
      <div>
        <h3 className={styles.h3}>Email</h3>
        <input
          type="text"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <h3 className={styles.h3}>City</h3>
        <input
          type="text"
          value={city}
          placeholder="City"
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </div>
      <div>
        <h3 className={styles.h3}>Password</h3>
        <input
          type="text"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button className={styles.deleteButton} onClick={cleanForm}>
        x
      </button>
      <button className={styles.confirmButton} onClick={handleSubmit}>
        Y
      </button>
    </form>
  );
};

export default Form;
