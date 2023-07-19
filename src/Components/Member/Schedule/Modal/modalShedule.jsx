import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import BadgeIcon from '@mui/icons-material/Badge';
import DialogTitle from '@mui/material/DialogTitle';
import CheckIcon from '@mui/icons-material/Check';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { Box, Button, Chip, Divider, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateSubscription, createSubscription } from 'Redux/subscriptions/thunks';

const Modal = (props) => {
  const dispatch = useDispatch();
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const showToast = (message, type) => {
    if (type === 'success') {
      props.toast.success(message, {
        duration: 2500,
        position: 'top-right',
        style: {
          background: '#fddba1'
        },
        iconTheme: {
          primary: '#0f232e',
          secondary: '#fff'
        }
      });
    } else if (type === 'error') {
      props.toast.error(message, {
        duration: 2500,
        position: 'top-right',
        style: {
          background: 'rgba(227, 23, 10, 0.5)'
        },
        iconTheme: {
          primary: '#0f232e',
          secondary: '#fff'
        }
      });
    }
  };

  const handleSubscribe = async () => {
    if (isButtonDisabled) {
      return;
    }
    setButtonDisabled(true);
    if (props.idSuscription) {
      try {
        const updateSuscription = {
          isActive: false
        };
        await dispatch(updateSubscription(updateSuscription, props.idSuscription));
        showToast('Subscription was succesfully removed', 'success');
        props.closeModal();
      } catch (error) {
        showToast(error.message, 'error');
        props.closeModal();
      }
    } else {
      try {
        const newDate = new Date();
        const newSuscription = {
          classes: props.idClass,
          member: props.idMember,
          date: newDate.setHours(newDate.getHours() - 3),
          isActive: true
        };
        await dispatch(createSubscription(newSuscription));
        showToast('Subscription was succesfully added', 'success');
        props.closeModal();
      } catch (error) {
        showToast(error.message, 'error');
        props.closeModal();
      }
    }
    setButtonDisabled(false);
  };

  return (
    <Dialog
      open={props.show}
      id="member-class-modal"
      keepMounted
      onClose={props.closeModal}
      sx={{
        backdropFilter: 'blur(8px)'
      }}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle
        id="member-class-modal-title"
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
        {props.activity} Class {props.hour}hs
      </DialogTitle>
      <Divider variant="middle">
        <Chip
          sx={{ fontSize: '15px', backgroundColor: '#212121', color: 'white' }}
          label={props.day.length > 1 ? props.day.join(', ') : props.day}
        />
      </Divider>
      <DialogContent
        id="member-class-modal-information"
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
          <BadgeIcon sx={{ fontSize: '27px', color: '#212121' }} /> {props.trainer}
        </Typography>

        <Typography id="alert-dialog-slide-description3">
          Slots: {props.slotCount}/{props.slot}
        </Typography>

        <Box margin={1} fontWeight={'bolder'}>
          {props.membership === 'Classic' || props.membership === 'None' ? (
            <Typography id="alert-dialog-slide-description4">
              Upgrade your membership to subscribe
            </Typography>
          ) : props.idSuscription ? (
            <Typography
              display={'flex'}
              alignItems={'center'}
              gap="5px"
              justifyContent={'center'}
              id="alert-dialog-slide-description3"
            >
              <CheckIcon fontSize="small" /> You are subscribed to this class
            </Typography>
          ) : (
            <Typography>
              {props.slot <= props.slotCount ? 'This class is full' : 'You are not in this class'}
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions
        sx={{ padding: '0px 30px 30px 30px', display: 'flex', justifyContent: 'center' }}
      >
        {(props.slot <= props.slotCount ||
          props.membership === 'Classic' ||
          props.membership === 'None') &&
        !props.idSuscription ? (
          <Button variant="contained" onClick={props.closeModal}>
            Cancel
          </Button>
        ) : (
          <Button
            id={props.idSuscription ? 'member-unsubscribe-button' : 'member-subscribe-button'}
            onClick={handleSubscribe}
            endIcon={props.idSuscription ? <PersonRemoveIcon /> : <RocketLaunchIcon />}
            variant="contained"
          >
            {props.idSuscription ? 'Unsubscribe' : 'Subscribe'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
