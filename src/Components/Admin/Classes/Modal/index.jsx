import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DeleteIcon from '@mui/icons-material/Delete';
import BadgeIcon from '@mui/icons-material/Badge';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, Chip, Divider, Typography } from '@mui/material';

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
          color: 'black',
          display: 'flex',
          alignItems: 'center',
          fontSize: '25px',
          padding: '20px 0 5px 0',
          gap: '5px',
          justifyContent: 'center'
        }}
      >
        {props.classTitle} {props.classHour}h
      </DialogTitle>
      <Divider variant="middle">
        <Chip
          sx={{ fontSize: '15px', backgroundColor: '#212121', color: 'white' }}
          label={props.classDay?.toString().replace(/([a-z])([A-Z])/g, '$1, $2')}
        />
      </Divider>
      <DialogContent
        sx={{
          padding: '30px 40px 20px 40px',
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
          <BadgeIcon sx={{ fontSize: '27px', color: '#212121' }} />{' '}
          {props.classTrainer ? props.classTrainer : 'Not Assigned'}
        </Typography>

        <Typography fontSize={18} id="alert-dialog-slide-description3">
          Slots: {props.classSlots}
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{ padding: '10px 30px 30px 30px', display: 'flex', justifyContent: 'center' }}
      >
        <Button id={props.editTestId} onClick={props.handleUpdate} variant="contained">
          <EditRoundedIcon />
        </Button>
        <Button id={props.editTestId} onClick={props.handleDelete} variant="contained">
          <DeleteIcon />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CalendarModal;
