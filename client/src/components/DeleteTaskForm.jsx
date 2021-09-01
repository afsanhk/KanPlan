import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Close from '@material-ui/icons/Close';

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

export default function DeleteTaskForm({ id, title }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={[classes.paper]}>
      <Close onClick={handleClose} className={classes.cross} />
      <h3 className={'delete-modal-text-a'}>
        Are you sure you want to delete <strong>'{id}'</strong>?
      </h3>
      <h3 className={'delete-modal-text-b'}>
        This action cannot be undone !
      </h3>
      <div className={'delete-modal-footer'}>
        <ConfirmButton cancelling close={handleClose} />
        <ConfirmButton deleting />
      </div>
    </div>
  );
}