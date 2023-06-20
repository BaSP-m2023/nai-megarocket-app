import React, { useEffect } from 'react';
import styles from './activities.module.css';
import { getActivities } from 'Redux/activities/thunks';
import { useSelector, useDispatch } from 'react-redux';

const Activities = () => {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities.data.data);

  const getColorClass = (index) => {
    const colorClasses = [styles.cardColor0, styles.cardColor1, styles.cardColor2];
    const colorIndex = index % colorClasses.length;
    return colorClasses[colorIndex];
  };

  useEffect(() => {
    dispatch(getActivities());
  }, []);

  return !activities ? (
    <div className={styles.bodyNotAvailable}>
      <div>
        <h2 className={styles.noActivitiesTitle}>No available activities</h2>
        <p className={styles.noActivitiesParagraph}>
          Sorry, at this moment we have no published activities.
        </p>
      </div>
    </div>
  ) : (
    <div className={styles.body}>
      <h1 className={styles.title}>Activities</h1>
      <div className={styles.cardsContainer}>
        {activities.map((activity, idx) => (
          <div
            key={idx}
            className={`${styles.cards} ${styles.cardAnimation} ${getColorClass(idx)}`}
          >
            <h2 className={styles.cardTitle}>{activity.name}</h2>
            <p className={styles.cardDescription}>{activity.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activities;
