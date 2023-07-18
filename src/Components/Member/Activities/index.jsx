import React, { useEffect } from 'react';
import styles from './activities.module.css';
import { getActivities } from 'Redux/activities/thunks';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'Components/Shared/Container';
import ClipLoader from 'react-spinners/ClipLoader';

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

  return (
    <Container>
      <div className={styles.container}>
        {activities ? (
          <>
            <div className={styles.headerContainer}>
              <h2>ACTIVITIES</h2>
              <div className={styles.line}></div>
              <p>
                These are all the activities available. If you want to try any of them subscribe to
                a class!
              </p>
            </div>
            <div className={styles.cardsContainer}>
              {activities.map((activity, idx) => (
                <div key={idx} className={`${styles.card} ${getColorClass(idx)}`}>
                  <h2>{activity.name}</h2>
                  <hr />
                  <p>{activity.description}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className={styles.spinner}>
            <ClipLoader />
          </div>
        )}
      </div>
    </Container>
  );
};

export default Activities;
