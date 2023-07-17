import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent sx={{ padding: '30px' }}>
          <DialogContentText id="alert-dialog-slide-description">{body}</DialogContentText>
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
            {isDelete ? 'Delete' : 'Logout'}
          </Button>{' '}
        </DialogActions>
      </Dialog>
    </div>
  );
}
