import { useEffect, useState } from 'react';
import styles from './schedule.module.css';
import Modal from './Modal/modalShedule';
import { useDispatch, useSelector } from 'react-redux';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { getClasses } from 'Redux/classes/thunks';
import { getActivities } from 'Redux/activities/thunks';
import { getSubscriptions } from 'Redux/subscriptions/thunks';
import ClipLoader from 'react-spinners/ClipLoader';
import Container from 'Components/Shared/Container';
import toast, { Toaster } from 'react-hot-toast';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import StarRateIcon from '@mui/icons-material/StarRate';

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
  const [infoClass, setInfoClass] = useState({
    Hour: '',
    day: '',
    trainer: '',
    activity: '',
    slot: '',
    slotCount: '',
    idSuscription: '',
    idClass: '',
    idMember: '',
    membership: ''
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
    toast.remove();
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

  const getMemberData = () => {
    setMemberData(user);
  };

  const membershipStyle = () => {
    switch (memberData?.membership) {
      case 'Only Classes':
        return styles.membershipOnly;
      case 'Classic':
        return styles.membershipClassic;
      case 'Black':
        return styles.membershipBlack;
      default:
        return styles.membershipNone;
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
        (item) =>
          item.classes?._id === classItem?._id &&
          item.member?._id === memberData?._id &&
          item.isActive === true
      );

      const subscriptionsForClass = subscriptions?.filter(
        (item) => item.classes?._id === classItem?._id && item.isActive === true
      );

      const slotCount = subscriptionsForClass.length;

      return (
        <div
          id={`member-schedule-enabled-${hour.slice(0, 2)}-${day.toLowerCase()}-button`}
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
              idMember: memberData?._id,
              membership: memberData?.membership
            }));
          }}
          className={suscriptionFound ? styles.addedButton : styles.classesButton}
        >
          <div className={styles.activityContainer}>
            <div className={styles.buttonText}>{classItem.activity?.name}</div>
            <div className={`${classItem.slots <= slotCount ? styles.slotsFull : ''}`}>
              {classItem.slots <= slotCount && <div>Full</div>}
            </div>
          </div>
          {!suscriptionFound
            ? `${classItem.trainer?.firstName}  ${classItem.trainer?.lastName}`
            : null}
          {suscriptionFound && (
            <div className={styles.slots}>
              <HowToRegIcon fontSize="small" /> Subscribed
            </div>
          )}
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
                <div className={styles.headerContainer}>
                  <div>
                    <h2 className={styles.title}>Scheduled Classes</h2>
                  </div>
                  <div className={styles.select}>
                    <FormControl variant="standard" fullWidth>
                      <InputLabel id="member-label-activity">Activity</InputLabel>
                      <Select
                        value={activity}
                        onChange={handleActivityChange}
                        id="member-select-activity"
                      >
                        <MenuItem value="all">All</MenuItem>
                        {activities?.map((activityItem, index) => (
                          <MenuItem
                            key={index}
                            value={activityItem.name}
                            id={`member-schedule-select-activity-${activityItem.name
                              .toString()
                              .toLowerCase()}`}
                          >
                            {activityItem.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className={`${styles.membershipContainer} ${membershipStyle()}`}>
                    {memberData?.membership === 'None' ? (
                      <p>Not membership, contact with an admin</p>
                    ) : (
                      <>
                        <StarRateIcon fontSize="small" style={{ paddingRight: '5px' }} />
                        {memberData?.membership}
                      </>
                    )}
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
        membership={infoClass.membership}
      />
    </>
  );
};

export default Schedule;
