import { useState, useEffect } from 'react';
import styles from './classes.module.css';
import Button from 'Components/Shared/Button';
import SharedModal from 'Components/Shared/Modal';
import { useHistory } from 'react-router-dom';
import { getClasses, deleteClass } from 'Redux/classes/thunks';
import { getActivities } from 'Redux/activities/thunks';
import { useSelector, useDispatch } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';
import CalendarModal from './Modal';
import Container from 'Components/Shared/Container';
import { getTrainers } from 'Redux/trainers/thunks';

const Classes = () => {
  const history = useHistory();

  const isLoading = useSelector((state) => state.classes.loading);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [classToDelete, setClassToDelete] = useState(null);
  const {
    classes = [],
    activities = [],
    trainers = []
  } = useSelector((state) => ({
    classes: state.classes.data.data,
    activities: state.activities.data.data,
    trainers: state.trainers.data
  }));
  const [activity, setActivity] = useState('all');
  const [trainer, setTrainer] = useState('all');
  const [calendarAlert, setCalendarAlert] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClasses());
    dispatch(getActivities());
    dispatch(getTrainers());
  }, []);

  const handleDeleteClass = () => {
    setCalendarAlert(false);
    setShowDeleteWarning(true);
  };

  const handleConfirmDeleteClass = async () => {
    setShowDeleteWarning(false);
    try {
      const data = await dispatch(deleteClass(classToDelete));
      setAlertMessage(data.message);
      setIsSuccess(true);
      setShowAlert(true);
    } catch (error) {
      setAlertMessage(error);
      setShowAlert(true);
      setIsSuccess(false);
    }
  };

  const handleAddClass = () => {
    history.push('/admins/classes/form/');
  };

  const handleUpdateClass = () => {
    history.push(`/admins/classes/form/${classToDelete}`);
  };

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const hoursOfDay = [
    { label: '08:00', value: 8 },
    { label: '09:00', value: 9 },
    { label: '10:00', value: 10 },
    { label: '11:00', value: 11 },
    { label: '12:00', value: 12 },
    { label: '13:00', value: 13 },
    { label: '14:00', value: 14 },
    { label: '15:00', value: 15 },
    { label: '16:00', value: 16 },
    { label: '17:00', value: 17 },
    { label: '18:00', value: 18 },
    { label: '19:00', value: 19 },
    { label: '20:00', value: 20 },
    { label: '21:00', value: 21 },
    { label: '22:00', value: 22 }
  ];

  const handleActivityChange = (e) => {
    setActivity(e.target.value);
  };

  const handleTrainerChange = (e) => {
    setTrainer(e.target.value);
  };

  const handleCloseModalCalendar = () => {
    setCalendarAlert(false);
  };
  const handleClass = (id) => {
    setClassToDelete(id);
    setCalendarAlert(true);
  };

  const getClassButton = (hour, day) => {
    let classItem;

    if (activity === 'all' && trainer === 'all') {
      classItem = classes?.find((item) => item.day.includes(day) && item.hour === hour);
    } else if (trainer !== 'all' && activity === 'all') {
      if (trainer === 'notAssign') {
        classItem = classes?.find(
          (item) =>
            item.day.includes(day) &&
            item.hour === hour &&
            (!item.trainer || !item.trainer?.isActive)
        );
      } else {
        classItem = classes?.find(
          (item) =>
            item.day.includes(day) &&
            item.hour === hour &&
            item.trainer?.firstName + item.trainer?.lastName === trainer
        );
      }
    } else if (activity !== 'all' && trainer === 'all') {
      classItem = classes?.find(
        (item) =>
          item.day.includes(day) &&
          item.hour === hour &&
          item.activity?.name === activity &&
          (!item.trainer || item.trainer?.isActive)
      );
    } else {
      if (trainer === 'notAssign') {
        classItem = classes?.find(
          (item) =>
            item.day.includes(day) &&
            item.hour === hour &&
            item.activity?.name === activity &&
            (!item.trainer || !item.trainer?.isActive)
        );
      } else {
        classItem = classes?.find(
          (item) =>
            item.day.includes(day) &&
            item.hour === hour &&
            item.activity?.name === activity &&
            item.trainer?.firstName + item.trainer?.lastName === trainer
        );
      }
    }

    if (classItem) {
      if (classItem.trainer && classItem.trainer?.isActive) {
        return (
          <div onClick={() => handleClass(classItem._id)} className={styles.classesButton}>
            <div className={styles.buttonText}>
              {classItem.activity?.name ? classItem.activity?.name : 'Not assigned activity'}
            </div>
            {classItem?.trainer?.firstName}
          </div>
        );
      } else {
        return (
          <div onClick={() => handleClass(classItem._id)} className={styles.classesButton}>
            <div className={styles.buttonText}>
              {classItem.activity?.name ? classItem.activity?.name : 'Not assigned activity'}
            </div>
            Not assigned trainer
          </div>
        );
      }
    } else {
      return <div className={styles.emptyButton}></div>;
    }
  };

  return (
    <Container>
      {isLoading ? (
        <ClipLoader />
      ) : classes ? (
        <>
          <div className={styles.container}>
            <div className={styles.header}>
              <div className={styles.titleContainer}>
                <h2 className={styles.title}>Scheduled Classes</h2>
                <Button
                  text={'+ Add Class'}
                  type={'add'}
                  clickAction={handleAddClass}
                  testId={'admin-classes-add-button'}
                />
              </div>
              <div className={styles.select}>
                <label htmlFor="activity">Select Activity: </label>
                <select id="activity" value={activity} onChange={handleActivityChange}>
                  <option value="all">All</option>
                  {activities?.map((activityItem, index) => (
                    <option
                      value={activityItem.name}
                      key={index}
                      id={`admin-classes-select-activity-${activityItem.name}`}
                    >
                      {activityItem.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.select}>
                <label htmlFor="trainer">Select Trainer: </label>
                <select id="trainer" value={trainer} onChange={handleTrainerChange}>
                  <option value="all">All</option>
                  <option value="notAssign">Not Assign</option>
                  {trainers?.map((trainerItem, index) => {
                    if (trainerItem.isActive) {
                      return (
                        <option
                          value={trainerItem.firstName + trainerItem.lastName}
                          key={index}
                          id={`admin-classes-select-trainer-${trainerItem.firstName}`}
                        >
                          {trainerItem.firstName + ' ' + trainerItem.lastName}
                        </option>
                      );
                    } else {
                      return (
                        <option
                          style={{ backgroundColor: '#878E88' }}
                          value={trainerItem.firstName + trainerItem.lastName}
                          key={index}
                          id={`admin-classes-select-trainer-${trainerItem.firstName}`}
                        >
                          {trainerItem.firstName + ' ' + trainerItem.lastName}
                        </option>
                      );
                    }
                  })}
                </select>
              </div>
            </div>
            <table>
              <thead>
                <tr className={styles.headerTable}>
                  <th>Hours</th>
                  {daysOfWeek?.map((day) => (
                    <th key={day}>{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {hoursOfDay?.map((hour) => (
                  <tr key={hour.value}>
                    <td className={styles.hourColumn}>{hour.label} </td>
                    {daysOfWeek?.map((day) => (
                      <td className={styles.column} key={day}>
                        <div className={styles.buttonContainer}>
                          {getClassButton(hour.label, day)}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <SharedModal
            isDelete={true}
            show={showDeleteWarning}
            closeModal={() => setShowDeleteWarning(false)}
            title={'Delete Class'}
            body={'Are you sure you want to delete this class?'}
            onConfirm={handleConfirmDeleteClass}
            testId={'admin-classes-modal'}
            confirmDeleteTestId={'admin-classes-button-confirm-modal'}
            closeTestId={'admin-classes-button-close-warning-modal'}
          />
          <SharedModal
            isDelete={false}
            show={showAlert}
            typeStyle={isSuccess ? 'success' : 'error'}
            closeModal={() => setShowAlert(false)}
            title={isSuccess ? 'Success' : 'Error'}
            body={alertMessage}
            testId={'admin-classes-modal'}
            closeTestId={'admin-classes-button-close-success-modal'}
          />
          <CalendarModal
            show={calendarAlert}
            title={'Class Options'}
            body={'What do you want to do ?'}
            onClose={handleCloseModalCalendar}
            closeModal={handleUpdateClass}
            onConfirm={handleDeleteClass}
            testId={'admin-classes-modal-calendar'}
            confirmDeleteTestId={'admin-classes-button-confirm-modal'}
            editTestId={'admin-classes-button-edit-modal'}
            closeTestId={'admin-classes-icon-cross-close-modal'}
          />
        </>
      ) : (
        <h3>There are no Classes in the database</h3>
      )}
    </Container>
  );
};

export default Classes;
