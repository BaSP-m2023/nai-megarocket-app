import React, { useEffect } from 'react';
import ProgressBar from './ProgressBar';
import styles from './activities.module.css';
import { getSubscriptions } from 'Redux/subscriptions/thunks';
import { useSelector, useDispatch } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';

const Activities = () => {
  const dispatch = useDispatch();
  const subscriptions = useSelector((state) => state.subscriptions.data);
  const loading = useSelector((state) => state.subscriptions.loading);

  useEffect(() => {
    dispatch(getSubscriptions());
  }, []);

  if (loading) {
    return <ClipLoader />;
  }

  const activityCount = {};

  if (subscriptions) {
    subscriptions.forEach((item) => {
      const activityName = item.classes?.activity?.name || 'No activity';
      activityCount[activityName] = (activityCount[activityName] || 0) + 1;
    });

    if (Object.keys(activityCount).length === 0) {
      activityCount['No activity'] = 1;
    }
  }

  const uniqueActivities = subscriptions
    ? Array.from(new Set(subscriptions.map((item) => item.classes?.activity?.name)))
    : [];

  return (
    <div className={styles.container}>
      {uniqueActivities.map((activityName, idx) => (
        <div key={idx} className={styles.progressBar}>
          <h2 className={styles.h2}>{activityName}</h2>
          <ProgressBar completed={activityCount[activityName] * 3.14} />
        </div>
      ))}
    </div>
  );
};

export default Activities;
