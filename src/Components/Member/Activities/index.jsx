import React, { useEffect } from 'react';
import styles from './activities.module.css';
import { getActivities } from 'Redux/activities/thunks';
import { useSelector, useDispatch } from 'react-redux';

const Activities = () => {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities.data.data);

  useEffect(() => {
    dispatch(getActivities());
  }, []);

  if (!activities) {
    return (
      <div className={styles.bodyNotAvailable}>
        <div>
          <h2 className={styles.noActivitiesTitle}>No available activities</h2>
          <p className={styles.noActivitiesParagraph}>
            Sorry, at this moment we have no published activities.
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.body}>
        <h1 className={styles.tittle}>Activities</h1>
        <div className={styles.cardsContainer}>
          {activities.map((activity, idx) => (
            <div key={idx} className={styles.cards}>
              <h2 className={styles.cardTittle}>{activity.name}</h2>
              <p className={styles.cardDescription}>{activity.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default Activities;
