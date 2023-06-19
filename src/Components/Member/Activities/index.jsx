import React, { useEffect } from 'react';
import styles from './activities.module.css';
import { getActivities } from 'Redux/activities/thunks';
import { useSelector, useDispatch } from 'react-redux';
//import ClipLoader from 'react-spinners/ClipLoader';

const Activities = () => {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities.data.data);

  useEffect(() => {
    dispatch(getActivities());
  }, []);
  console.log('activities: ', activities);

  if (!activities) {
    // spinners goes here.
    return <h2>No available activities</h2>;
  } else {
    return (
      <div className={styles.body}>
        <h1 className={styles.tittle}>Activities</h1>
        {activities.map((activity, idx) => (
          <div key={idx}>
            <h2>{activity.name}</h2>
            <p>{activity.description}</p>
          </div>
        ))}
      </div>
    );
  }
};

export default Activities;
