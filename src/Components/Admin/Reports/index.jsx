import React, { useState } from 'react';
import Activities from './Activities';
import ButtonGroup from './Buttons';
import ReportsMemberships from './Memberships';
import ReportsMembers from './Members';
import Container from 'Components/Shared/Container';

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
    <Container>
      <ButtonGroup setActiveComponent={setActiveComponent} />
      {renderComponent()}
    </Container>
  );
};

export default Reports;
