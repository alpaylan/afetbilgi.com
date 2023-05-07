import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { commonStyles } from '../util/Style';

type ConfirmDialogProps = {
  title: string;
  content: string;
  okText: string;
  cancelText: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  color: 'primary' | 'error';
};

export const ConfirmDialog = (props: ConfirmDialogProps) => {
  const handleClose = () => {
    props.onClose();
  };

  const handleConfirm = () => {
    props.onConfirm();
  };

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {props.content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant='contained'
          color={'inherit'}
          onClick={handleClose}
          sx={commonStyles.buttonText}
        >
          {props.cancelText}
        </Button>
        <Button
          variant='contained'
          onClick={handleConfirm}
          autoFocus
          color={props.color}
          sx={commonStyles.buttonText}
        >
          {props.okText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
