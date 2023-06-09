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
  const [modalInformation, setModalInformation] = useState({ title: '', body: '' });
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [classesID, setClassesID] = useState('');

  const getClasses = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/classes`);
      const responseData = await response.json();
      const data = responseData.data;

      setClasses(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteClasses = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/classes/${id}`, {
        method: 'DELETE'
      });
      setClasses([...classes.filter((classes) => classes._id !== id)]);
      setAlertMessage('Class deleted successfully');
      setShowAlert(true);
      console.log('este es el iddddd', id);
    } catch (error) {
      console.error('Error deleting item:', error);
      setAlertMessage('Error deleting classes');
      setShowAlert(true);
    }
  };

  const handleAddClass = () => {
    history.push('/classes/form');
  };

  const handleUpdateClass = (id) => {
    history.push(`/classes/form/${id}`);
  };

  const handleDeleteClass = (id) => {
    setModalInformation({ title: 'Warning', body: 'Are you sure?' });
    setShowDeleteWarning(true);
    setClassesID(id);
  };

  const closeDeleteWarning = () => {
    setShowDeleteWarning(false);
  };

  const confirmDeleteClass = async () => {
    deleteClasses(classesID);
    setShowDeleteWarning(false);
  };

  const handleExitAlert = () => {
    setShowSuccessAlert(false);
    setShowAlert(false);
  };

  useEffect(() => {
    getClasses();
  }, []);

  return (
    <section className={styles.container}>
      <>
        <h2>Classes</h2>
        <Button clickAction={handleAddClass} text="Add New" type="add" />
        <Table
          data={classes || []}
          properties={['activity.name', 'day', 'hour', 'slots', 'trainer.firstName']}
          columnTitles={['Activity', 'Day', 'Hour', 'Slots', 'Trainer']}
          handleUpdateItem={handleUpdateClass}
          handleDeleteItem={handleDeleteClass}
        />
        <SharedModal
          show={showDeleteWarning}
          closeModal={closeDeleteWarning}
          onConfirm={confirmDeleteClass}
          title={modalInformation.title}
          body={modalInformation.body}
          isDelete={true}
        />
        <SharedModal
          isDelete={false}
          show={showSuccessAlert}
          closeModal={handleExitAlert}
          onConfirm={handleExitAlert}
          typeStyle={'success'}
          title={'Success'}
          body={alertMessage}
        />
        <SharedModal
          isDelete={false}
          show={showAlert}
          closeModal={handleExitAlert}
          onConfirm={handleExitAlert}
          typeStyle={'success'}
          title={'Class deleted!'}
          body={alertMessage}
        />
      </>
    </section>
  );
};

export default Classes;
