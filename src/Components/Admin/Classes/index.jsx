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
import toast, { Toaster } from 'react-hot-toast';

const Classes = () => {
  const history = useHistory();
  const isLoadingClasses = useSelector((state) => state.classes?.loading);
  const isLoadingActivities = useSelector((state) => state.activities?.loading);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [classToDelete, setClassToDelete] = useState(null);
  const { classes = [], activities = [] } = useSelector((state) => ({
    classes: state.classes?.data.data,
    activities: state.activities?.data.data
  }));
  const [activity, setActivity] = useState('');
  const [calendarAlert, setCalendarAlert] = useState(false);
  const dispatch = useDispatch();
  const isLoading = isLoadingActivities && isLoadingClasses;
  useEffect(() => {
    toast.remove();
    dispatch(getClasses());
    dispatch(getActivities());
    const toastMessage = localStorage.getItem('toastMessage');
    if (toastMessage) {
      showToast(toastMessage, 'success');
      localStorage.removeItem('toastMessage');
    }
  }, []);

  const showToast = (message, type) => {
    if (type === 'success') {
      toast.success(message, {
        duration: 2500,
        position: 'top-right',
        style: {
          background: '#fddba1'
        },
        iconTheme: {
          primary: '#0f232e',
          secondary: '#fff'
        }
      });
    } else if (type === 'error') {
      toast.error(message, {
        duration: 2500,
        position: 'top-right',
        style: {
          background: 'rgba(227, 23, 10, 0.5)'
        },
        iconTheme: {
          primary: '#0f232e',
          secondary: '#fff'
        }
      });
    }
  };

  useEffect(() => {
    if (activities.length > 0) {
      setActivity(activities[0].name);
    }
  }, [activities]);

  const handleDeleteClass = () => {
    setCalendarAlert(false);
    setShowDeleteWarning(true);
  };

  const handleConfirmDeleteClass = async () => {
    setShowDeleteWarning(false);
    try {
      const data = await dispatch(deleteClass(classToDelete));
      showToast(data.message, 'success');
    } catch (error) {
      showToast(error.message, 'error');
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

  const handleCloseModalCalendar = () => {
    setCalendarAlert(false);
  };
  const handleClass = (id) => {
    setClassToDelete(id);
    setCalendarAlert(true);
  };

  const getClassButton = (hour, day) => {
    const classItem = classes.find(
      (item) => item.day.includes(day) && item.hour === hour && item.activity?.name === activity
    );
    return classItem ? (
      <div onClick={() => handleClass(classItem._id)} className={styles.classesButton}>
        <div className={styles.buttonText}>{activity}</div>
        {classItem?.trainer?.firstName}
      </div>
    ) : (
      <div className={styles.emptyButton}></div>
    );
  };

  return (
    <>
      <Toaster
        containerStyle={{
          margin: '10vh 0 0 0'
        }}
      />
      {isLoading ? (
        <Container center={true}>
          <ClipLoader />
        </Container>
      ) : classes ? (
        <Container>
          <div className={styles.container}>
            <div className={styles.header}>
              <div className={styles.titleContainer}>
                <h2 className={styles.title}>Scheduled Classes</h2>
                <Button
                  text={'+ Add Class'}
                  type={'add'}
                  clickAction={handleAddClass}
                  testId={'admin-button-add'}
                />
              </div>
              <div className={styles.select}>
                <label htmlFor="activity">Select Activity: </label>
                <select
                  id="activity"
                  value={activity ? activity : activities[0]}
                  onChange={handleActivityChange}
                >
                  {activities?.map((activityItem, index) => (
                    <option
                      value={activityItem.name}
                      key={index}
                      id={`admin-select-activity-${activityItem.name}`}
                    >
                      {activityItem.name}
                    </option>
                  ))}
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
            testId={'admin-modal'}
            confirmDeleteTestId={'admin-button-confirm-modal'}
            closeTestId={'admin-button-close-warning-modal'}
          />
          <CalendarModal
            show={calendarAlert}
            title={'Class Options'}
            body={'What do you want to do ?'}
            onClose={handleCloseModalCalendar}
            closeModal={handleUpdateClass}
            onConfirm={handleDeleteClass}
            testId={'admin-modal-calendar'}
            confirmDeleteTestId={'admin-button-confirm-modal'}
            editTestId={'admin-button-edit-modal'}
            closeTestId={'admin-icon-cross-close-modal'}
          />
        </Container>
      ) : (
        <Container center={true}>
          <h3>There are no Classes in the database</h3>
        </Container>
      )}
    </>
  );
};

export default Classes;
