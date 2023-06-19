import React, { useEffect } from 'react';
import ProgressBar from './ProgressBar';
import styles from '../reports.module.css';
import { getClasses } from 'Redux/classes/thunks';
import { useSelector, useDispatch } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';

const Activities = () => {
  const dispatch = useDispatch();
  const classes = useSelector((state) => state.classes.data.data);
  const loading = useSelector((state) => state.classes.loading);

  useEffect(() => {
    dispatch(getClasses());
  }, []);

  if (loading) {
    return <ClipLoader />;
  }

  console.log(classes);

  const activityCount = {};

  if (classes) {
    classes.forEach((item) => {
      const activityName = item.activity.name;
      activityCount[activityName] = (activityCount[activityName] || 0) + 1;
    });
  }

  const uniqueActivities = classes
    ? Array.from(new Set(classes.map((item) => item.activity.name)))
    : [];

  return (
    <div>
      {uniqueActivities.map((activityName, idx) => (
        <div key={idx} className={styles.progressBar}>
          <h2 className={styles.h2}>{activityName}</h2>
          <ProgressBar completed={activityCount[activityName] * 5} />
        </div>
      ))}
    </div>
  );
};

export default Activities;
