import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styles from './form.module.css';
import Button from '../../Shared/Button/index';
import SharedModal from '../../Shared/Modal/index';
import { useSelector, useDispatch } from 'react-redux';
import { updateTrainer, addTrainer } from '../../../Redux/trainers/thunks';

const Form = () => {
  const history = useHistory();
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalTypeStyle, setModalTypeStyle] = useState('success');
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const dispatch = useDispatch();
  const trainers = useSelector((state) => state.trainers.data);
  const [trainer, setTrainer] = useState({
    firstName: '',
    lastName: '',
    dni: '',
    phone: '',
    email: '',
    city: '',
    salary: '',
    password: ''
  });

  useEffect(() => {
    if (id) {
      getTrainerById();
    }
  }, []);

  const getTrainerById = () => {
    const trainerToUpdate = trainers.find((trainer) => trainer._id === id);
    if (trainerToUpdate) {
      setTrainer({
        firstName: trainerToUpdate.firstName,
        lastName: trainerToUpdate.lastName,
        dni: trainerToUpdate.dni,
        phone: trainerToUpdate.phone,
        email: trainerToUpdate.email,
        city: trainerToUpdate.city,
        password: trainerToUpdate.password,
        salary: trainerToUpdate.salary
      });
    } else {
      console.error('Trainer not found');
    }
  };

  const createTrainer = async () => {
    try {
      await dispatch(addTrainer(trainerData));
      setModalMessage('Trainer added successfully');
      setModalTypeStyle('success');
      setShowModal(true);
      setShouldRedirect(true);
    } catch (error) {
      console.error('Error to add trainer:', error);
      setModalMessage('Error to add trainer');
      setModalTypeStyle('error');
      setShowModal(true);
    }
  };

  const updateTrainerFunction = async (id, trainer) => {
    try {
      await dispatch(updateTrainer(id, trainer));
      setModalMessage('trainer updated successfully');
      setShouldRedirect(true);
      setShowModal(true);
    } catch (error) {
      setModalMessage('error');
      setShowModal(true);
    }
  };

  const trainerData = {
    firstName: trainer.firstName,
    lastName: trainer.lastName,
    dni: trainer.dni,
    phone: trainer.phone,
    email: trainer.email,
    city: trainer.city,
    salary: trainer.salary,
    password: trainer.password
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      updateTrainerFunction(id, trainerData);
    } else {
      createTrainer(trainerData);
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (shouldRedirect) {
      history.push('/trainers');
    }
  };

  const handleCancel = () => {
    history.push('/trainers');
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
            value={trainer.firstName}
            onChange={(e) => setTrainer({ ...trainer, firstName: e.target.value })}
            required
          />
        </div>
        <div className={styles.box}>
          <h4>Last Name</h4>
          <input
            type="text"
            placeholder="Last Name"
            value={trainer.lastName}
            onChange={(e) => setTrainer({ ...trainer, lastName: e.target.value })}
            required
          />
        </div>
        <div className={styles.box}>
          <h4>DNI</h4>
          <input
            type="number"
            placeholder="DNI"
            value={trainer.dni}
            onChange={(e) => setTrainer({ ...trainer, dni: e.target.value })}
            required
          />
        </div>
        <div className={styles.box}>
          <h4>Phone Number</h4>
          <input
            type="number"
            placeholder="Phone Number"
            value={trainer.phone}
            onChange={(e) => setTrainer({ ...trainer, phone: e.target.value })}
            required
          />
        </div>
        <div className={styles.box}>
          <h4>Email</h4>
          <input
            type="text"
            placeholder="Email"
            value={trainer.email}
            onChange={(e) => setTrainer({ ...trainer, email: e.target.value })}
            required
          />
        </div>
        <div className={styles.box}>
          <h4>City</h4>
          <input
            type="text"
            placeholder="City"
            value={trainer.city}
            onChange={(e) => setTrainer({ ...trainer, city: e.target.value })}
            required
          />
        </div>
        <div className={styles.box}>
          <h4>Salary</h4>
          <input
            type="number"
            placeholder="Salary"
            value={trainer.salary}
            onChange={(e) => setTrainer({ ...trainer, salary: e.target.value })}
            required
          />
        </div>
        <div className={styles.box}>
          <h4>Password</h4>
          <input
            type="text"
            placeholder="Password"
            value={trainer.password}
            onChange={(e) => setTrainer({ ...trainer, password: e.target.value })}
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
