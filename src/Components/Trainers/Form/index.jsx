import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styles from './form.module.css';

const Form = () => {
  const history = useHistory();
  const { id } = useParams();
  const [firstName, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dni, setDNI] = useState('');
  const [phone, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');
  const [salary, setSalary] = useState('');

  const getTrainerById = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainers/${id}`);
    const data = await response.json();
    const trainer = data.data;
    setName(trainer.firstName);
    setLastName(trainer.lastName);
    setDNI(trainer.dni);
    setPhoneNumber(trainer.phone);
    setEmail(trainer.email);
    setCity(trainer.city);
    setSalary(trainer.salary);
    setPassword(trainer.password);
  };

  useEffect(() => {
    if (id) {
      getTrainerById();
    }
  }, []);

  const handleSubmit = async (e) => {
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
    if (id) {
      editTrainer(id, formData);
    } else {
      addTrainer(formData);
    }
  };
  const addTrainer = async (formData) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
      } else {
        alert(data.message);
        history.push('/trainers');
      }
    } catch (error) {
      console.error('Error al agregar entrenador:', error);
    }
  };

  const editTrainer = async (id, formData) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/trainers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
      } else {
        alert(data.message);
        history.push('/trainers');
      }
    } catch (error) {
      console.error('Error al editar entrenador:', error);
    }
  };
  const handleCancel = () => {
    history.goBack();
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
          {id ? <p>Confirm</p> : <p>Submit</p>}
        </button>
      </div>
    </form>
  );
};
export default Form;
