import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DeleteIcon from '@mui/icons-material/Delete';
import BadgeIcon from '@mui/icons-material/Badge';
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
          backgroundColor: '#212121',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          fontSize: '26px',
          fontWeight: '600',
          padding: '5px',
          gap: '5px',
          justifyContent: 'center'
        }}
      >
        {props.classTitle}
      </DialogTitle>
      <Divider />
      <DialogContent
        sx={{
          padding: '20px 40px',
          color: '#212121',
          minWidth: '300px',
          textAlign: 'center'
        }}
      >
        <Typography
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
          variant="h6"
          id="alert-dialog-slide-description"
        >
          <BadgeIcon sx={{ fontSize: '27px', color: '#212121' }} /> {props.classTrainer}
        </Typography>
        <Typography variant="h6" id="alert-dialog-slide-description2">
          {props.classDay?.toString().replace(/([a-z])([A-Z])/g, '$1, $2')}
        </Typography>
        <Typography variant="h6" id="alert-dialog-slide-description3">
          Hour: {props.classHour} - Slots: {props.classSlots}
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{ padding: '0px 30px 15px 30px', display: 'flex', justifyContent: 'center' }}
      >
        <Button id={props.editTestId} onClick={props.handleUpdate} variant="outlined">
          <EditRoundedIcon />
        </Button>
        <Button id={props.editTestId} color="error" onClick={props.handleDelete} variant="outlined">
          <DeleteIcon />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CalendarModal;
