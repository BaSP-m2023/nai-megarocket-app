import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, Divider, Typography } from '@mui/material';

const CalendarModal = (props) => {
  return (
    <Dialog
      open={props.show}
      id={props.testId}
      keepMounted
      onClose={props.onClose}
      sx={{
        backdropFilter: 'blur(8px)'
      }}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          fontSize: '26px',
          fontWeight: '700',
          padding: '10px',
          gap: '5px',
          justifyContent: 'center',
          marginLeft: '10px'
        }}
      >
        <CalendarMonthRoundedIcon sx={{ fontSize: '35px' }} /> {props.classTitle}
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ padding: '20px 40px', minWidth: '300px', textAlign: 'center' }}>
        <Typography variant="h6" id="alert-dialog-slide-description">
          {props.classTrainer}
        </Typography>
        <Typography variant="h6" id="alert-dialog-slide-description2">
          {props.classDay?.toString().replace(/([a-z])([A-Z])/g, '$1, $2')}
        </Typography>
        <Typography variant="h6" id="alert-dialog-slide-description3">
          {props.classHour}
        </Typography>

        <Typography variant="h6" id="alert-dialog-slide-description4">
          {props.classSlots}
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{ padding: '0px 30px 15px 30px', display: 'flex', justifyContent: 'center' }}
      >
        <Button id={props.editTestId} onClick={props.handleUpdate} variant="contained">
          <EditRoundedIcon />
        </Button>
        <Button
          id={props.editTestId}
          onClick={props.handleDelete}
          variant="contained"
          color="error"
        >
          <DeleteOutlineRoundedIcon />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CalendarModal;
