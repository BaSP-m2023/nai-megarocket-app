import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import BadgeIcon from '@mui/icons-material/Badge';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Button, Chip, Divider, Typography } from '@mui/material';

const CalendarModal = (props) => {
  return (
    <Dialog
      open={props.show}
      id={props.testId}
      keepMounted
      onClose={props.closeModal}
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
        {props.activity} Class {props.hour}h
      </DialogTitle>
      <Divider variant="middle">
        <Chip
          sx={{ fontSize: '15px', backgroundColor: '#212121', color: 'white' }}
          label={props.day?.toString().replace(/([a-z])([A-Z])/g, '$1, $2')}
        />
      </Divider>
      <Box
        sx={{
          padding: '10px 40px 0px 40px',
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
          {props.trainer ? props.trainer : 'Not Assigned'}
        </Typography>

        <Typography fontSize={18} id="alert-dialog-slide-description3">
          Slots: {props.subscriptions?.length} / {props.slot}
        </Typography>
      </Box>
      <Typography
        justifyContent={'center'}
        display="flex"
        paddingTop="10px"
        paddingBottom="10px"
        fontSize={20}
        fontWeight={'bolder'}
        id="alert-dialog-slide-description3"
      >
        Subscribed Members
      </Typography>
      <DialogContent dividers={scroll === 'paper'}>
        <Box
          id="scroll-dialog-description"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            maxHeight: '70px'
          }}
          tabIndex={-1}
        >
          {props.subscriptions?.length > 0
            ? props.subscriptions?.map((sub, index) => {
                const fullName = `${sub.member?.firstName} ${sub.member?.lastName}`;
                const membership = sub.member?.membership;

                return (
                  <>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }} key={index}>
                      <Typography
                        sx={{ color: '#212121' }}
                        fontSize={18}
                        id="alert-dialog-slide-description3"
                      >
                        {fullName}
                      </Typography>
                      <Typography
                        sx={{
                          backgroundColor: membership === 'Black' ? 'black' : 'gray',
                          padding: '0 10px',
                          borderRadius: '20px',
                          color: 'white'
                        }}
                      >
                        {membership}
                      </Typography>
                    </Box>
                  </>
                );
              })
            : 'No one is here yet'}
        </Box>
      </DialogContent>
      <DialogActions
        sx={{ padding: '20px 30px 20px 30px', display: 'flex', justifyContent: 'center' }}
      >
        <Button id="trainer-modal-button-back" onClick={props.closeModal} variant="contained">
          Back
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CalendarModal;
