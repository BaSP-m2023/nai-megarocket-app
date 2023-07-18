import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import GppMaybeRoundedIcon from '@mui/icons-material/GppMaybeRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { Divider, Typography } from '@mui/material';

export default function ConfirmModal({
  onClose,
  onConfirm,
  title,
  body,
  open,
  confirmId,
  isDelete,
  closeId
}) {
  return (
    <div>
      <Dialog
        open={open}
        keepMounted
        id={'confirm-modal'}
        onClose={onClose}
        sx={{
          backdropFilter: 'blur(8px)'
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '10px',
            gap: '5px',
            marginLeft: '10px'
          }}
        >
          {' '}
          {isDelete ? (
            <GppMaybeRoundedIcon sx={{ fontSize: '30px' }} color="error" />
          ) : (
            <LogoutRoundedIcon color="primary" />
          )}
          {title}
        </DialogTitle>
        <Divider variant="middle" />
        <DialogContent sx={{ padding: '20px', minWidth: '300px' }}>
          <Typography id="alert-dialog-slide-description">{body}</Typography>
        </DialogContent>
        <DialogActions sx={{ padding: '30px 30px 15px 30px' }}>
          <Button id={closeId} onClick={onClose} sx={{ color: 'black', borderColor: 'black' }}>
            Cancel
          </Button>
          <Button
            id={confirmId}
            color={isDelete ? 'error' : 'primary'}
            variant="contained"
            onClick={onConfirm}
          >
            {isDelete ? 'Delete' : 'Leave'}
          </Button>{' '}
        </DialogActions>
      </Dialog>
    </div>
  );
}
