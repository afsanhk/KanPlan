import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Close from '@material-ui/icons/Close';

import ConfirmButton from './ConfirmButton'
import LoadingCircle from './LoadingCircle';

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
    width: '30vw',
    top: '40vh',
    left: '35vw',
    position: 'fixed',

  },
  cross: {
    alignSelf: 'flex-end',
    '&:hover': {
      cursor: 'pointer'
    }
  }
}));

//prop received from Delete button from ProjectOverviewTable =>
//  task prop = object containing all details about task
export default function DeleteTaskForm({ close, task, deleteTask, projectID, userID }) {

  const classes = useStyles();

  function deleteSingleTask() {
    deleteTask(task.id, projectID, userID)
    close()
  }


  return (
    <>
    {!task ? (<LoadingCircle>Deleting...</LoadingCircle>): 
      <div className={[classes.paper]}> 
        <Close onClick={close} className={classes.cross} />
        <h3 className={'delete-modal-text-a'}>
          Are you sure you want to delete '{task.title}'?
        </h3>
        <h3 className={'delete-modal-text-b'}>
          This action cannot be undone !
        </h3>
        <div className={'delete-modal-footer'}>
          <ConfirmButton cancelling close={close} />
          <ConfirmButton deleting deleteSingleTask={deleteSingleTask} />
        </div>
      </div>}
  </>
  );
}