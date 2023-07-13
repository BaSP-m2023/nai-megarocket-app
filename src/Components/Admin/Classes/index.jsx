import { useState, useEffect } from 'react';
import styles from './classes.module.css';
import Button from 'Components/Shared/Button';
import SharedModal from 'Components/Shared/Modal';
import { useHistory } from 'react-router-dom';
import { getClasses, deleteClass } from 'Redux/classes/thunks';
import { getActivities } from 'Redux/activities/thunks';
import { getTrainers } from 'Redux/trainers/thunks';
import { useSelector, useDispatch } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';
import CalendarModal from './Modal';
import Container from 'Components/Shared/Container';
import toast, { Toaster } from 'react-hot-toast';
import { FormControl, InputLabel } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const Classes = () => {
  const history = useHistory();
  const isLoadingClasses = useSelector((state) => state.classes?.loading);
  const isLoadingActivities = useSelector((state) => state.activities?.loading);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
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
  const isLoading = isLoadingActivities && isLoadingClasses;
  useEffect(() => {
    toast.remove();
    dispatch(getClasses());
    dispatch(getActivities());
    dispatch(getTrainers());
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
                  testId={'admin-classes-add-button'}
                />
              </div>
              <div className={styles.select}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel id="activity">Activity</InputLabel>
                  <Select
                    value={activity}
                    onChange={handleActivityChange}
                    id={'admin-classes-input-day'}
                  >
                    <MenuItem value="all">All</MenuItem>
                    {activities?.map((activityItem, index) => (
                      <MenuItem key={index} value={activityItem.name}>
                        {activityItem.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className={styles.select}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel id="trainer">Select Trainer</InputLabel>
                  <Select value={trainer} onChange={handleTrainerChange} id="trainer">
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="notAssign">Not Assign</MenuItem>
                    {trainers?.map((trainerItem, index) => (
                      <MenuItem
                        value={trainerItem.firstName + trainerItem.lastName}
                        key={index}
                        id={`admin-classes-select-trainer-${trainerItem.firstName}`}
                        sx={trainerItem.isActive ? null : { color: '#878E88' }}
                      >
                        {trainerItem.firstName + ' ' + trainerItem.lastName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
