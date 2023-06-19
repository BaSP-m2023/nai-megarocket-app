import React, { useState } from 'react';
import Activities from './Activities';
import ButtonGroup from './Buttons';
import ReportsMemberships from './Memberships';
import ReportsMembers from './Members';
import styles from './reports.module.css';

const Reports = () => {
  const [activeComponent, setActiveComponent] = useState('activities');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'activities':
        return <Activities />;
      case 'memberships':
        return <ReportsMemberships />;
      case 'members':
        return <ReportsMembers />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <ButtonGroup setActiveComponent={setActiveComponent} />
      {renderComponent()}
    </div>
  );
};

export default Reports;
