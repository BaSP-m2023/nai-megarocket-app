import React, { useState, useEffect } from 'react';
import ReportsTrainers from './Trainers';
import ReportsSubscriptions from './Subscriptions';
import ButtonGroup from './Buttons';
import ReportsMemberships from './Memberships';
import ReportsMembers from './Members';
import Container from 'Components/Shared/Container';
import styles from './reports.module.css';
import { getMembers } from 'Redux/members/thunks';
import { getClasses } from 'Redux/classes/thunks';
import { getSubscriptions } from 'Redux/subscriptions/thunks';
import { useDispatch } from 'react-redux';

const Reports = () => {
  const [activeComponent, setActiveComponent] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMembers());
    dispatch(getClasses());
    dispatch(getSubscriptions());
  }, []);

  const renderComponent = () => {
    switch (activeComponent) {
      case 'subscriptions':
        return <ReportsSubscriptions />;
      case 'trainers':
        return <ReportsTrainers />;
      case 'memberships':
        return <ReportsMemberships />;
      case 'members':
        return <ReportsMembers />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <div className={styles.container}>
        <ButtonGroup setActiveComponent={setActiveComponent} />
        {renderComponent()}
      </div>
    </Container>
  );
};

export default Reports;
