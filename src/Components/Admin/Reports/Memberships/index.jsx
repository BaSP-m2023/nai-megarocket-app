import React from 'react';
import VerticalBar from '../Members/VerticalBar';
import styles from './memberships.module.css';

const ReportsMemberships = () => {
  const months = [
    { month: 'January', value: 10 },
    { month: 'February', value: 20 },
    { month: 'March', value: 15 },
    { month: 'April', value: 8 },
    { month: 'May', value: 12 },
    { month: 'June', value: 17 },
    { month: 'July', value: 9 },
    { month: 'August', value: 14 },
    { month: 'September', value: 11 },
    { month: 'October', value: 6 },
    { month: 'November', value: 19 },
    { month: 'December', value: 13 }
  ];

  return (
    <div className={styles.container}>
      {months.map(({ month, value }, idx) => (
        <VerticalBar key={idx} month={month} value={value} />
      ))}
    </div>
  );
};

export default ReportsMemberships;
