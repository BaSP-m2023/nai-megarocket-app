import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';

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
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent sx={{ padding: '30px', minWidth: '300px' }}>
          <Typography id="alert-dialog-slide-description">{body}</Typography>
        </DialogContent>
        <DialogActions sx={{ padding: '30px' }}>
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
