import { useEffect, useState } from 'react';
import styles from './schedule.module.css';
import Modal from './Modal/modalShedule';
import { useDispatch, useSelector } from 'react-redux';
import { BsCheckCircleFill } from 'react-icons/bs';
import { getClasses } from 'Redux/classes/thunks';
import { getActivities } from 'Redux/activities/thunks';
import { getMembersById } from 'Redux/members/thunks';
import { getSubscriptions } from 'Redux/subscriptions/thunks';
import ClipLoader from 'react-spinners/ClipLoader';
import Container from 'Components/Shared/Container';

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
  const loading = useSelector((state) => state.members.loading);
  const [memberData, setMemberData] = useState(null);
  const [suscriptionsMember, setSuscriptionsMember] = useState('');
  const [activity, setActivity] = useState('');
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [infoClass, setInfoClass] = useState({
    Hour: '',
    day: '',
    trainer: '',
    slot: '',
    added: false,
    idSuscription: '',
    idClass: '',
    idMember: ''
  });

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getClasses());
        dispatch(getActivities());
        dispatch(getSubscriptions());
        getMemberData();
      } catch (error) {
        console.error('Error:', error);
        setError(true);
      }
    };
    if (!showModal) {
      fetchData();
    }
  }, [showModal]);

  const getMemberData = async () => {
    try {
      const idMember = '648cf236ace9aaef8ae7656c';
      const response = await dispatch(getMembersById(idMember));
      setMemberData(response.data);
    } catch (error) {
      console.error('Error:', error);
      setError(true);
    }
  };

  useEffect(() => {
    if (activities.length > 0 && !suscriptionsMember) {
      setActivity(activities[0].name);
    }
  }, [activities]);

  useEffect(() => {
    if (subscriptions.length > 0 && memberData) {
      getMemberClasses(memberData);
    }
  }, [activity, memberData, subscriptions]);

  const getMemberClasses = (memberData) => {
    const memberSubscriptions = subscriptions.filter(
      (sub) => sub.member && sub.member._id === memberData._id
    );

    if (memberSubscriptions.length > 0) {
      const classIds = memberSubscriptions?.map((sub) => sub.classes && sub.classes._id);
      setSuscriptionsMember(classIds);
    } else {
      console.error('Subscriptions not found');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleActivityChange = (e) => {
    setActivity(e.target.value);
  };

  const getClassButton = (hour, day) => {
    const classItem = classes.find(
      (item) => item.day.includes(day) && item.hour === hour && item.activity?.name === activity
    );
    const classMemberFound = suscriptionsMember.includes(classItem?._id);

    if (classItem) {
      const suscriptionFound = subscriptions.filter(
        (sub) => sub.member?._id === memberData?._id && sub.classes?._id === classItem?._id
      );

      return (
        <div
          className={classMemberFound ? styles.addedButton : styles.classesButton}
          onClick={() => {
            setShowModal(true);
            setInfoClass(() => ({
              hour: classItem.hour,
              trainer: `${classItem.trainer.firstName} ${classItem.trainer.lastName}`,
              slot: classItem.slots,
              day: classItem.day,
              added: classMemberFound ? true : false,
              idSuscription: suscriptionFound[0]?._id,
              idClass: classItem?._id,
              idMember: memberData?._id
            }));
          }}
        >
          <div className={styles.buttonText}>{activity}</div>
          {classItem.trainer.firstName}
          {classMemberFound && (
            <div>
              <BsCheckCircleFill /> Subscribed
            </div>
          )}
        </div>
      );
    } else {
      return <div className={styles.emptyButton}></div>;
    }
  };

  return (
    <>
      {loading ? (
        <Container>
          <ClipLoader />
        </Container>
      ) : (
        <>
          {error ? (
            <Container>
              <div className={styles.errorContainer}>
                <p>An error occurred while loading the data.</p>
              </div>
            </Container>
          ) : (
            <Container>
              <div className={styles.container}>
                <div className={styles.header}>
                  <h2 className={styles.title}>
                    Scheduled Classes - Member: {memberData?.firstName}
                  </h2>
                  <div>
                    <label className={styles.selectLabel} htmlFor="activity">
                      Select Activity:{' '}
                    </label>
                    <select
                      className={styles.select}
                      id="activity"
                      value={activity}
                      onChange={handleActivityChange}
                    >
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
                              {getClassButton(hour.label, day)}
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Container>
          )}
        </>
      )}
      <Modal
        show={showModal}
        setShowModal={setShowModal}
        closeModal={handleCloseModal}
        day={infoClass.day}
        hour={infoClass.hour}
        slot={infoClass.slot}
        trainer={infoClass.trainer}
        activity={activity}
        added={infoClass.added}
        idSuscription={infoClass.idSuscription}
        idClass={infoClass.idClass}
        idMember={infoClass.idMember}
      />
    </>
  );
};

export default Schedule;
