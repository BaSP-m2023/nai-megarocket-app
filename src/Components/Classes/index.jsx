import { useState, useEffect } from 'react';
import styles from './classes.module.css';
import Table from '../Shared/Table';
import Button from '../Shared/Button';
import SharedModal from '../Shared/Modal';
import { useHistory } from 'react-router-dom';

const Classes = () => {
  const history = useHistory();
  const [classes, setClasses] = useState([]);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [classToDelete, setClassToDelete] = useState(null);

  useEffect(() => {
    getClasses();
  }, []);

  const deleteClasses = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/classes/${id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (!response.ok) {
        setAlertMessage(data.message);
        setShowAlert(true);
        setIsSuccess(false);
      }
      setAlertMessage(data.message);
      setIsSuccess(true);
      setShowAlert(true);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getClasses = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/classes`);
      const data = await response.json();
      setClasses(data.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleDeleteClass = (id) => {
    setShowDeleteWarning(true);
    setClassToDelete(id);
  };

  const handleConfirmDeleteClass = async () => {
    setShowDeleteWarning(false);
    try {
      await deleteClasses(classToDelete);
      setClasses((prevClasses) =>
        prevClasses.filter((classItem) => classItem._id !== classToDelete)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddClass = () => {
    history.push('/classes/form/');
  };

  const handleUpdateClass = (id) => {
    history.push(`/classes/form/${id}`);
  };

  return (
    <section className={styles.container}>
      <div className={styles.classesSection}>
        <h2>Classes</h2>
        <Button text={'+ Add Class'} type={'add'} clickAction={handleAddClass} />
      </div>
      {classes.length !== 0 ? (
        <>
          <Table
            data={classes}
            handleDeleteItem={handleDeleteClass}
            handleUpdateItem={handleUpdateClass}
            columnTitles={['Activity', 'Day', 'Hour', 'Slots', 'Trainer']}
            properties={['activity.name', 'day', 'hour', 'slots', 'trainer.firstName']}
          />
          <SharedModal
            isDelete={true}
            show={showDeleteWarning}
            closeModal={() => setShowDeleteWarning(false)}
            title={'Delete Class'}
            body={'Are you sure you want to delete this class?'}
            onConfirm={handleConfirmDeleteClass}
          />
          <SharedModal
            isDelete={false}
            show={showAlert}
            typeStyle={isSuccess ? 'success' : 'error'}
            closeModal={() => setShowAlert(false)}
            title={isSuccess ? 'Success' : 'Error'}
            body={alertMessage}
          />
        </>
      ) : (
        <h3>There are no Classes in the database</h3>
      )}
    </section>
  );
};

export default Classes;
