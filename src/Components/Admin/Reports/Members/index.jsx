import React from 'react';
import VerticalBar from '../VerticalBar';
import styles from './members.module.css';

const ReportsMembers = () => {
  const months = [
    { month: 'Jan', value: 10 },
    { month: 'Feb', value: 20 },
    { month: 'Mar', value: 15 },
    { month: 'Apr', value: 8 },
    { month: 'May', value: 12 },
    { month: 'Jun', value: 17 },
    { month: 'Jul', value: 9 },
    { month: 'Aug', value: 14 },
    { month: 'Sep', value: 11 },
    { month: 'Oct', value: 6 },
    { month: 'Nov', value: 19 },
    { month: 'Dec', value: 13 }
  ];

  return (
    <div className={styles.container}>
      {months.map(({ month, value }, idx) => (
        <VerticalBar key={idx} name={month} value={value} />
      ))}
    </div>
  );
};

export default ReportsMembers;
