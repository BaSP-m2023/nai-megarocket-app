import { useState, useEffect } from 'react';
import styles from './classes.module.css';
import Table from '../Shared/Table/index';
import Button from '../Shared/Button';
import SharedModal from '../Shared/Modal';
import { useHistory } from 'react-router-dom';

const Classes = () => {
  const history = useHistory();
  const [classes, setClasses] = useState([]);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [classId, setClassId] = useState();
  const [modalInformation, setModalInformation] = useState({ title: '', body: '' });
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const getClasses = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/classes`);
      const responseData = await response.json();
      const data = responseData.data;

      const transformedData = Object.values(data).map((classItem, index) => {
        return {
          ...classItem,
          _id: index.toString()
        };
      });

      setClasses(transformedData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/classes`);
        const responseData = await response.json();
        const data = responseData.data;

        const transformedData = Object.values(data).map((classItem, index) => {
          return {
            ...classItem,
            _id: index.toString()
          };
        });

        setClasses(transformedData);
        console.log('las clases aca', classes);
      } catch (error) {
        console.error(error);
      }
    };

    getClasses();
    fetchData();
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
      } else {
        setAlertMessage(data.message);
        setShowSuccessAlert(true);
      }
    } catch (error) {
      console.error(error);
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
    setClassId(id);
  };

  const closeDeleteWarning = () => {
    setShowDeleteWarning(false);
  };

  const confirmDeleteClass = async () => {
    try {
      await deleteClasses(classId);
      setClasses((prevClasses) => prevClasses.filter((classItem) => classItem._id !== classId));
      setShowDeleteWarning(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleExitAlert = () => {
    setShowSuccessAlert(false);
  };

  return (
    <section className={styles.container}>
      <>
        <h2>Classes</h2>
        <Button clickAction={handleAddClass} text="Add New" type="add" />
        <Table
          data={classes || []}
          properties={[
            'classes._id',
            'classes.activity.name',
            'classes.day',
            'classes.hour',
            'classes.slots',
            'classes.trainer'
          ]}
          columnTitles={['Activity', 'Day', 'Hour', 'Slots', 'Trainer']}
          handleUpdateItem={handleUpdateClass}
          handleDeleteItem={handleDeleteClass}
          keyProperty="_id"
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
          title={'Success'}
          body={alertMessage}
        />
        <SharedModal
          isDelete={false}
          show={showAlert}
          closeModal={handleExitAlert}
          title={'Something is wrong'}
          body={alertMessage}
        />
      </>
    </section>
  );
};

export default Classes;
