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
              <div className={styles.header}>
                <h1 className={styles.title}>Activities</h1>
                <div className={styles.line}></div>
                <p className={styles.paragraph}>
                  These are all the activities available. If you want to try any of them subscribe
                  to a class!
                </p>
              </div>
            </div>
            <div className={styles.cardsContainer}>
              {activities.map((activity, idx) => (
                <div
                  key={idx}
                  className={`${styles.card} ${styles.cardsAnimation} ${getColorClass(idx)}`}
                >
                  <h2 className={styles.cardTitle}>{activity.name}</h2>
                  <hr />
                  <p className={styles.cardDescription}>{activity.description}</p>
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
