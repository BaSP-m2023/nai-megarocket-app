import { useEffect, useState } from 'react';
import styles from './schedule.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getClasses } from '../../../Redux/classes/thunks';
import { getActivities } from '../../../Redux/activities/thunks';

const Schedule = () => {
  const dispatch = useDispatch();
  const { classes = [], activities = [] } = useSelector((state) => ({
    classes: state.classes.data.data,
    activities: state.activities.data.data
  }));

  const [activity, setActivity] = useState(activities.length > 0 ? activities[0].name : '');

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const hoursOfDay = [
    { label: '8:00', value: 8 },
    { label: '9:00', value: 9 },
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

  useEffect(() => {
    dispatch(getClasses());
    dispatch(getActivities());
  }, []);

  const handleActivityChange = (e) => {
    setActivity(e.target.value);
  };

  const getActivityButtonText = (hour, day) => {
    const classItem = classes.find(
      (item) =>
        item.day.includes(day) &&
        item.hour === hour &&
        item.activity?.name === activity &&
        item.trainer
    );

    return classItem ? (
      <span>
        <span className={styles.buttonText}>{activity}</span> (Slots {classItem.slots}){'\n'}
        {classItem.trainer.firstName}
      </span>
    ) : (
      ''
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Scheduled Classes</h2>
        <div className={styles.select}>
          <label htmlFor="activity">Select Activity: </label>
          <select id="activity" value={activity} onChange={handleActivityChange}>
            {activities?.map((activityItem, index) => (
              <option value={activityItem.name} key={index}>
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
                    <button
                      className={
                        getActivityButtonText(hour.label, day)
                          ? styles.scheduledButton
                          : styles.emptyButton
                      }
                    >
                      {getActivityButtonText(hour.label, day)}
                    </button>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Schedule;
