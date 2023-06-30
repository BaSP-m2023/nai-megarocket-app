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
import toast, { Toaster } from 'react-hot-toast';

const Schedule = () => {
  const dispatch = useDispatch();
  const {
    classes = [],
    activities = [],
    subscriptions = [],
    user = []
  } = useSelector((state) => ({
    classes: state.classes?.data?.data,
    activities: state.activities?.data?.data,
    subscriptions: state.subscriptions?.data,
    user: state.auth?.user
  }));
  const loading = useSelector((state) => state.members.loading);
  const [memberData, setMemberData] = useState(null);
  const [activity, setActivity] = useState('');
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const id = user?._id;
  const [infoClass, setInfoClass] = useState({
    Hour: '',
    day: '',
    trainer: '',
    activity: '',
    slot: '',
    slotCount: '',
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
    fetchData();
    setActivity('all');
  }, []);

  const getMemberData = async () => {
    try {
      const response = await dispatch(getMembersById(id));
      setMemberData(response.data);
    } catch (error) {
      console.error('Error:', error);
      setError(true);
    }
  };

  const getClassButton = (hour, day) => {
    let classItem;
    if (activity === 'all') {
      classItem = classes?.find((item) => item.day.includes(day) && item.hour === hour);
    } else {
      classItem = classes?.find(
        (item) => item.day.includes(day) && item.hour === hour && item.activity?.name === activity
      );
    }

    if (classItem) {
      const suscriptionFound = subscriptions?.find(
        (item) => item.classes?._id === classItem?._id && item.member?._id === memberData?._id
      );

      const subscriptionsForClass = subscriptions?.filter(
        (item) => item.classes?._id === classItem?._id
      );

      const slotCount = subscriptionsForClass.length;

      return (
        <div
          onClick={() => {
            setShowModal(true);
            setInfoClass(() => ({
              hour: classItem.hour,
              trainer: `${classItem.trainer?.firstName} ${classItem.trainer?.lastName}`,
              activity: classItem.activity?.name,
              slot: classItem.slots,
              slotCount: slotCount,
              day: classItem.day,
              idSuscription: suscriptionFound?._id,
              idClass: classItem?._id,
              idMember: memberData?._id
            }));
          }}
          className={suscriptionFound ? styles.addedButton : styles.classesButton}
        >
          <div className={styles.buttonText}>{classItem.activity?.name}</div>
          {!suscriptionFound ? classItem.trainer?.firstName : null}
          {suscriptionFound && (
            <div className={styles.slots}>
              <BsCheckCircleFill /> Subscribed
            </div>
          )}
          <div className={styles.slotsFull}>{classItem.slots <= slotCount && <div>Full</div>}</div>
        </div>
      );
    } else {
      return <div className={styles.emptyButton}></div>;
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleActivityChange = (e) => {
    setActivity(e.target.value);
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
              <Toaster
                containerStyle={{
                  margin: '10vh 0 0 0'
                }}
              />
              <div className={styles.container}>
                <div className={styles.header}>
                  <h2 className={styles.title}>Scheduled Classes</h2>
                  <div className={styles.filterActivity}>
                    <label className={styles.selectLabel} htmlFor="activity">
                      Filter by activity:{' '}
                    </label>
                    <select
                      className={styles.select}
                      id="activity"
                      value={activity}
                      onChange={handleActivityChange}
                    >
                      <option value="all">All</option>
                      {activities?.map((activityItem, index) => (
                        <option
                          value={activityItem.name}
                          key={index}
                          id={`member-schedule-select-activity-${activityItem.name}`}
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
            </Container>
          )}
        </>
      )}
      <Modal
        show={showModal}
        toast={toast}
        setShowModal={setShowModal}
        closeModal={handleCloseModal}
        day={infoClass.day}
        hour={infoClass.hour}
        slot={infoClass.slot}
        slotCount={infoClass.slotCount}
        trainer={infoClass.trainer}
        activity={infoClass.activity}
        idSuscription={infoClass.idSuscription}
        idClass={infoClass.idClass}
        idMember={infoClass.idMember}
      />
    </>
  );
};

export default Schedule;
