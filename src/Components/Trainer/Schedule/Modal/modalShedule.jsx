import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import BadgeIcon from '@mui/icons-material/Badge';
import DialogTitle from '@mui/material/DialogTitle';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import { Box, Button, Chip, Divider, Tooltip, Typography } from '@mui/material';

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
  box1: {
    padding: '10px 40px 0px 40px',
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
  typography2: {
    justifyContent: 'center',
    display: 'flex',
    paddingTop: '10px',
    fontSize: '20',
    fontWeight: 'bolder'
  },
  box2: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxHeight: '70px'
  },
  box3: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  typography3: {
    color: '#212121'
  },
  dialogActions: {
    padding: '0px 30px 15px 30px',
    display: 'flex',
    justifyContent: 'center'
  }
};

const CalendarModal = (props) => {
  return (
    <Dialog
      open={props.show}
      id="trainer-class-modal"
      keepMounted
      onClose={props.closeModal}
      sx={styles.dialog}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="trainer-class-title" sx={styles.dialogTitle}>
        {props.activity} Class {props.hour}h
      </DialogTitle>
      <Divider variant="middle">
        <Chip sx={styles.chip} label={props.day?.toString().replace(/([a-z])([A-Z])/g, '$1, $2')} />
      </Divider>
      <Box id="trainer-class-information">
        <Box sx={styles.box1}>
          <Typography sx={styles.typography1} variant="h6" id="alert-dialog-slide-description">
            <BadgeIcon sx={{ fontSize: '27px', color: '#212121' }} />{' '}
            {props.trainer ? props.trainer : 'Not Assigned'}
          </Typography>

          <Typography fontSize={18} id="alert-dialog-slide-description3">
            Slots: {props.subscriptions?.length}/{props.slot}
          </Typography>
        </Box>
        <Typography sx={styles.typography2} id="alert-dialog-slide-description3">
          Subscribed Members
        </Typography>
        <DialogContent dividers={scroll === 'paper'}>
          <Box id="scroll-dialog-description" sx={styles.box2} tabIndex={-1}>
            {props.subscriptions?.length > 0
              ? props.subscriptions?.map((sub, index) => {
                  const fullName = `${sub.member?.firstName} ${sub.member?.lastName}`;
                  const membership = sub.member?.membership;

                  return (
                    <>
                      <Box sx={styles.box3} key={index}>
                        <Typography
                          sx={styles.typography3}
                          fontSize={18}
                          id="alert-dialog-slide-description3"
                        >
                          {fullName}
                        </Typography>
                        <Tooltip title={membership} followCursor>
                          <Typography
                            sx={{
                              ...styles.typography4,
                              color: membership === 'Black' ? 'black' : 'gray'
                            }}
                          >
                            <RocketLaunchRoundedIcon sx={{ fontSize: '25px' }} />
                          </Typography>{' '}
                        </Tooltip>
                      </Box>
                    </>
                  );
                })
              : 'No one is here yet'}
          </Box>
        </DialogContent>
      </Box>
      <DialogActions sx={styles.dialogActions}>
        <Button id="trainer-modal-button-back" onClick={props.closeModal} variant="contained">
          Back
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CalendarModal;
