import React, { useState, useEffect } from 'react';
import styles from './form.module.css';

const Form = ({ onSubmit, onCancel, editMode, trainer }) => {
  const [firstName, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dni, setDNI] = useState('');
  const [phone, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');
  const [salary, setSalary] = useState('');

  useEffect(() => {
    if (editMode && trainer) {
      setName(trainer.firstName);
      setLastName(trainer.lastName);
      setDNI(trainer.dni);
      setPhoneNumber(trainer.phone);
      setEmail(trainer.email);
      setCity(trainer.city);
      setSalary(trainer.salary);
      setPassword(trainer.password);
    }
  }, [editMode, trainer]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      firstName,
      lastName,
      dni,
      phone,
      email,
      city,
      password,
      salary
    };
    onSubmit(formData);
    setName('');
    setLastName('');
    setDNI('');
    setPhoneNumber('');
    setEmail('');
    setCity('');
    setPassword('');
    setSalary('');
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.container}>
        <div className={styles.box}>
          <h4>Name</h4>
          <input
            type="text"
            placeholder="Name"
            value={firstName}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className={styles.box}>
          <h4>Last Name</h4>
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className={styles.box}>
          <h4>DNI</h4>
          <input
            type="number"
            placeholder="DNI"
            value={dni}
            onChange={(e) => setDNI(e.target.value)}
            required
          />
        </div>
        <div className={styles.box}>
          <h4>Phone Number</h4>
          <input
            type="number"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className={styles.box}>
          <h4>Email</h4>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.box}>
          <h4>City</h4>
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className={styles.box}>
          <h4>Salary</h4>
          <input
            type="number"
            placeholder="Salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
          />
        </div>
        <div className={styles.box}>
          <h4>Password</h4>
          <input
            type="text"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </div>
      <div className={styles.buttons}>
        <button className={styles.button} type="button" onClick={handleCancel}>
          Cancel
        </button>
        <button className={styles.button} type="submit" onSubmit={handleSubmit}>
          {editMode ? <p>Edit</p> : <p>Add</p>}
        </button>
      </div>
    </form>
  );
};

export default Form;
