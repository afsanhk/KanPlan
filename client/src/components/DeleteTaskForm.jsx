import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CloseIcon from '@material-ui/icons/Close';
import Close from '@material-ui/icons/Close';
import { Task } from 'frappe-gantt-react';

import ConfirmButton from './ConfirmButton'

import '../styles/DeleteTaskForm.scss'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '3px #757575 solid',
    'border-radius': '8px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '30vw'
  },
  cross: {
    alignSelf: 'flex-end',
    '&:hover': {
      cursor: 'pointer'
    }
  }
}));

export default function TransitionsModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={[classes.paper]}>
          <Close onClick={handleClose} className={classes.cross} />
          <h3 className={'delete-modal-text-a'}>
            Are you sure you want to delete 'this task'?
          </h3>
          <h3 className={'delete-modal-text-b'}>
            This action cannot be undone !
          </h3>
          <div className={'delete-modal-footer'}>
            <ConfirmButton cancelling close={handleClose} />
            <ConfirmButton deleting />
          </div>
        </div>
      </Fade>
    </Modal>
  );
}