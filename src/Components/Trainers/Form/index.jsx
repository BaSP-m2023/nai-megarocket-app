import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styles from './form.module.css';
import Button from '../../Shared/Button/index';
import SharedModal from '../../Shared/Modal/index';

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
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalTypeStyle, setModalTypeStyle] = useState('success');
  const [shouldRedirect, setShouldRedirect] = useState(false);

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

  const handleCloseModal = () => {
    setShowModal(false);
    if (shouldRedirect) {
      history.push('/trainers');
    }
  };

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
        setModalMessage(data.message);
        setModalTypeStyle('error');
        setShowModal(true);
      } else {
        setModalMessage('Trainer added successfully');
        setModalTypeStyle('success');
        setShowModal(true);
        setShouldRedirect(true);
      }
    } catch (error) {
      console.error('Error to add trainer:', error);
      setModalMessage('Error to add trainer');
      setModalTypeStyle('error');
      setShowModal(true);
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
        setModalMessage(data.message);
        setModalTypeStyle('error');
        setShowModal(true);
      } else {
        setModalMessage('Trainer edited successfully');
        setModalTypeStyle('success');
        setShowModal(true);
        setShouldRedirect(true);
      }
    } catch (error) {
      console.error('Error to edit trainer:', error);
      setModalMessage('Error to edit trainer');
      setModalTypeStyle('error');
      setShowModal(true);
    }
  };
  const handleCancel = () => {
    history.goBack();
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.headContainer}>
        <h2>{id ? 'Update Trainer' : 'Add Trainer'}</h2>
      </div>
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
        <Button text="Cancel" type="cancel" clickAction={handleCancel} />
        <Button text={id ? 'Confirm' : 'Submit'} type="submit" clickAction={handleSubmit} />
      </div>
      <SharedModal
        show={showModal}
        title={id ? 'Edit Trainer' : 'Add Trainer'}
        body={modalMessage}
        isDelete={false}
        typeStyle={modalTypeStyle}
        closeModal={handleCloseModal}
        onConfirm={() => {
          handleSubmit;
        }}
      />
    </form>
  );
};
export default Form;
