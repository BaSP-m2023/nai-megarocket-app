import React, { useState, useEffect } from 'react';
import ReportsTrainers from './Trainers';
import ReportsSubscriptions from './Subscriptions';
import ButtonGroup from './Buttons';
import ReportsMembers from './Members';
import Container from 'Components/Shared/Container';
import { getMembers } from 'Redux/members/thunks';
import { getClasses } from 'Redux/classes/thunks';
import { getSubscriptions } from 'Redux/subscriptions/thunks';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { ClipLoader } from 'react-spinners';
import { getTrainers } from 'Redux/trainers/thunks';

const Reports = () => {
  const [activeComponent, setActiveComponent] = useState('subscriptions');
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.members.loading);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getMembers());
        dispatch(getClasses());
        dispatch(getSubscriptions());
        dispatch(getTrainers());
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
      {loading ? (
        <ClipLoader />
      ) : (
        <Box>
          <ButtonGroup setActiveComponent={setActiveComponent} />
          {renderComponent()}
        </Box>
      )}
    </Container>
  );
};

export default Reports;
