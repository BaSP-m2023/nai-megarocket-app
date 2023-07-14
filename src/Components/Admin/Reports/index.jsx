import React, { useState, useEffect } from 'react';
import ReportsTrainers from './Trainers';
import ReportsSubscriptions from './Subscriptions';
import ButtonGroup from './Buttons';
import ReportsMembers from './Members';
import Container from 'Components/Shared/Container';
import styles from './reports.module.css';
import { getMembers } from 'Redux/members/thunks';
import { getClasses } from 'Redux/classes/thunks';
import { getSubscriptions } from 'Redux/subscriptions/thunks';
import { useDispatch } from 'react-redux';

const Reports = () => {
  const [activeComponent, setActiveComponent] = useState('subscriptions');
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getMembers());
        dispatch(getClasses());
        dispatch(getSubscriptions());
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);

  const renderComponent = () => {
    switch (activeComponent) {
      case 'subscriptions':
        return <ReportsSubscriptions />;
      case 'trainers':
        return <ReportsTrainers />;
      case 'members':
        return <ReportsMembers />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <div className={styles.container}>
        <ButtonGroup setActiveComponent={setActiveComponent} activeComponent={activeComponent} />
        {renderComponent()}
      </div>
    </Container>
  );
};

export default Reports;
