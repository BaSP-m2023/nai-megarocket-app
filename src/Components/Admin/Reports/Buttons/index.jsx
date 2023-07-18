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
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 100
  };

  const styleSx = (type) => ({
    fontWeight: '600',
    fontSize: '20',
    width: '300px',
    backgroundColor: activeComponentButton === type ? '#212121' : '#fff',
    color: activeComponentButton === type ? '#fff' : '#212121',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#212121',
      color: 'white'
    }
  });

  return (
    <ButtonGroup
      sx={{
        boxShadow: 6,
        '& .MuiButtonGroup-grouped:not(:last-of-type)': {
          borderColor: '#bdbdbd'
        }
      }}
      style={getButtonGroupStyles}
      variant="contained"
      aria-label="outlined primary button group"
    >
      <Button
        id={'admin-button-report-subscription'}
        sx={styleSx('subscriptions')}
        onClick={() => handleButtonClick('subscriptions')}
      >
        Class Subscriptions
      </Button>
      <Button
        id={'admin-button-report-member'}
        sx={styleSx('members')}
        onClick={() => handleButtonClick('members')}
      >
        Members & Memberships
      </Button>
      <Button
        id={'admin-button-report-trainer'}
        sx={styleSx('trainers')}
        onClick={() => handleButtonClick('trainers')}
      >
        Class activities and trainers
      </Button>
    </ButtonGroup>
  );
};

export default ButtonsGroup;
