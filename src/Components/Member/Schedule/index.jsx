import { useEffect, useState } from 'react';
import styles from './schedule.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { BiStar } from 'react-icons/bi';
import { getClasses } from 'Redux/classes/thunks';
import { getActivities } from 'Redux/activities/thunks';
import { getMembersById } from 'Redux/members/thunks';
import { getSubscriptions } from 'Redux/subscriptions/thunks';

const Schedule = () => {
  const dispatch = useDispatch();
  const {
    classes = [],
    activities = [],
    subscriptions = []
  } = useSelector((state) => ({
    classes: state.classes.data.data,
    activities: state.activities.data.data,
    subscriptions: state.subscriptions.data
  }));

  const [memberData, setMemberData] = useState(null);
  const [suscriptionsMember, setSuscriptionsMember] = useState('');
  const [activity, setActivity] = useState('');

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
    dispatch(getSubscriptions());
  }, []);

  useEffect(() => {
    if (activities.length > 0) {
      setActivity(activities[0].name);
    }
    getMemberData();
  }, [activities]);

  useEffect(() => {
    if (subscriptions.length > 0 && memberData) {
      getMemberClasses(memberData);
    }
  }, [memberData, activity]);

  const getMemberData = async () => {
    const idMember = '648cf236ace9aaef8ae7656c';
    const response = await dispatch(getMembersById(idMember));
    setMemberData(response.data);
  };

  const getMemberClasses = (memberData) => {
    const memberSubscriptions = subscriptions.filter((sub) => sub.member._id === memberData._id);

    if (memberSubscriptions.length > 0) {
      const classIds = memberSubscriptions?.map((sub) => sub.classes?._id);
      setSuscriptionsMember(classIds);
    } else {
      console.error('Subscriptions not found');
    }
  };

  const handleActivityChange = (e) => {
    setActivity(e.target.value);
  };

  const getClassButton = (hour, day) => {
    const classItem = classes.find(
      (item) => item.day.includes(day) && item.hour === hour && item.activity?.name === activity
    );
    const classMemberFound = suscriptionsMember.includes(classItem?._id);

    return classItem ? (
      <div className={classMemberFound ? styles.addedButton : styles.classesButton}>
        <div className={styles.buttonText}>{activity}</div>
        {classItem.trainer.firstName}
        {classMemberFound && (
          <div>
            <BiStar /> Added
          </div>
        )}
      </div>
    ) : (
      <div className={styles.emptyButton}></div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Scheduled Classes - Member: {memberData?.firstName}</h2>
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
                  <div className={styles.buttonContainer}>{getClassButton(hour.label, day)}</div>
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
