import React, { useState } from 'react';

import styles from './reports.module.css';
import Activities from './Activities';
import ButtonGroup from './ButtonGroup';
import ReportsMemberships from './Memberships';
import ReportsMembers from './Members';

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
