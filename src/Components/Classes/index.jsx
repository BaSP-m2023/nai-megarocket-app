import { useState, useEffect } from 'react';
import styles from './classes.module.css';
import Table from '../Shared/Table';
import Button from '../Shared/Button';
import SharedModal from '../Shared/Modal';
import { useHistory } from 'react-router-dom';
import { getClasses, deleteClass } from '../../Redux/classes/thunks';
import { useSelector, useDispatch } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';

const Classes = () => {
  const history = useHistory();
  const classes = useSelector((state) => state.classes.data.data);
  const isLoading = useSelector((state) => state.classes.loading);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [classToDelete, setClassToDelete] = useState(null);

  const refreshTable = () => {
    dispatch(getClasses());
  };

  const dispatch = useDispatch();

  useEffect(() => {
    refreshTable();
  }, []);

  const handleDeleteClass = (id) => {
    setShowDeleteWarning(true);
    setClassToDelete(id);
  };

  const handleConfirmDeleteClass = async () => {
    setShowDeleteWarning(false);
    let data;
    try {
      data = dispatch(deleteClass(classToDelete));
      setAlertMessage(data.message);
      setIsSuccess(true);
      setShowAlert(true);
      refreshTable();
    } catch (error) {
      setAlertMessage(data.message);
      setShowAlert(true);
      setIsSuccess(false);
    }
  };

  const handleAddClass = () => {
    history.push('/classes/form/');
  };

  const handleUpdateClass = (id) => {
    history.push(`/classes/form/${id}`);
  };

  return (
    <section className={styles.classesContainer}>
      <div className={styles.classesSection}>
        <h2>Classes</h2>
        <Button text={'+ Add Class'} type={'add'} clickAction={handleAddClass} />
      </div>
      {isLoading ? (
        <ClipLoader />
      ) : classes ? (
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
