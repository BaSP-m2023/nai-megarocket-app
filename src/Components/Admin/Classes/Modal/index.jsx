import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DeleteIcon from '@mui/icons-material/Delete';
import BadgeIcon from '@mui/icons-material/Badge';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, Chip, Divider, Typography } from '@mui/material';

const styles = {
  dialog: {
    backdropFilter: 'blur(8px)'
  },
  dialogTitle: {
    color: 'black',
    display: 'flex',
    alignItems: 'center',
    fontSize: '25px',
    padding: '20px 0 5px 0',
    gap: '5px',
    justifyContent: 'center'
  },
  chip: {
    fontSize: '15px',
    backgroundColor: '#212121',
    color: 'white'
  },
  dialogContent: {
    padding: '30px 40px 20px 40px',
    color: '#212121',
    minWidth: '300px',
    textAlign: 'center'
  },
  typography1: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px'
  },
  dialogActions: {
    padding: '10px 30px 30px 30px',
    display: 'flex',
    justifyContent: 'center'
  }
};

const CalendarModal = ({
  show,
  testId,
  onClose,
  classTitle,
  classHour,
  classDay,
  classTrainer,
  classSlots,
  handleUpdate,
  handleDelete
}) => {
  return (
    <Dialog
      open={show}
      id={testId}
      keepMounted
      onClose={onClose}
      sx={styles.dialog}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle sx={styles.dialogTitle}>
        {classTitle ? classTitle : 'Not Assigned'} Class {classHour}hs
      </DialogTitle>
      <Divider variant="middle">
        <Chip sx={styles.chip} label={classDay?.toString().replace(/([a-z])([A-Z])/g, '$1, $2')} />
      </Divider>
      <DialogContent sx={styles.dialogContent}>
        <Typography sx={styles.typography1} variant="h6" id="alert-dialog-slide-description">
          <BadgeIcon sx={{ fontSize: '27px', color: '#212121' }} />{' '}
          {classTrainer ? classTrainer : 'Not Assigned'}
        </Typography>

        <Typography fontSize={18} id="alert-dialog-slide-description3">
          Slots: {classSlots}
        </Typography>
      </DialogContent>
      <DialogActions sx={styles.dialogActions}>
        <Button onClick={handleUpdate} variant="contained">
          <EditRoundedIcon />
        </Button>
        <Button onClick={handleDelete} variant="contained">
          <DeleteIcon />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CalendarModal;
