import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const ButtonsGroup = ({ setActiveComponent }) => {
  const [activeComponentButton, setActiveComponentButton] = useState('subscriptions');

  const handleButtonClick = (component) => {
    setActiveComponent(component);
    setActiveComponentButton(component);
  };

  const getButtonGroupStyles = {
    display: 'flex',
    position: 'fixed',
    top: '15%',
    left: '55%',
    transform: 'translateX(-50%)',
    zIndex: 100
  };

  const styleSx = (type) => ({
    fontWeight: '600',
    fontSize: '20',
    width: '300px',
    backgroundColor: activeComponentButton === type ? '#1f90c4' : '#fff',
    color: activeComponentButton === type ? '#fff' : '#1f90c4',
    textShadow: '1px 1px 1px rgba(0, 0, 0, 0.1)',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#c0e5f7',
      color: '#1f90c4'
    }
  });

  return (
    <ButtonGroup
      style={getButtonGroupStyles}
      variant="contained"
      aria-label="outlined primary button group"
    >
      <Button sx={styleSx('subscriptions')} onClick={() => handleButtonClick('subscriptions')}>
        Class subscriptions
      </Button>
      <Button sx={styleSx('members')} onClick={() => handleButtonClick('members')}>
        Members & memberships
      </Button>
      <Button sx={styleSx('trainers')} onClick={() => handleButtonClick('trainers')}>
        Class activities and trainers
      </Button>
    </ButtonGroup>
  );
};

export default ButtonsGroup;
