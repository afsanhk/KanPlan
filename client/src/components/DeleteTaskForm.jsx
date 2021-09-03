import React from 'react';
import { useHistory } from "react-router-dom";
import { useLocation, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Close from '@material-ui/icons/Close';

import ConfirmButton from './ConfirmButton'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

import '../styles/DeleteTaskForm.scss'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: '#fcfcfc',
    border: '3px #757575 solid',
    'border-radius': '8px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '24vw',
    top: '22vh',
    left: '40.2vw',
    position: 'fixed',
  },
  cross: {
    alignSelf: 'flex-end',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  error: {
    fontSize: '150px',
  }
}));

//prop received from Delete button from ProjectOverviewTable =>
//  task prop = object containing all details about task

//prop recieved from Delete button from ProjectListItem =>
//  project prop = object containing all details about task
export default function DeleteTaskForm({ close, task, deleteTask, projectID, userID, project, deleteProject }) {

  const classes = useStyles();
  const history = useHistory();

  const { pathname } = useLocation(); //extracts pathname from current url location

  function deleteSingleTask() {
    deleteTask(task.id, projectID, userID)
    close()
  }

  function deleteSingleProject() {
    deleteProject(project.id)
      
    if (pathname.includes('overview')) {
      history.push('/')
    } else {
      close()
    }
  }


  return (
    <>
      {task &&
        <div className={[classes.paper]}> 
          <Close onClick={close} className={classes.cross} />
          <ErrorOutlineIcon className={classes.error} color='secondary'/>
          <p className={'delete-modal-text-a'}>
            Are you sure you want to delete the task:
          </p>
          <p className={'delete-modal-prop-data'}>
          '<u><em>{task.title}</em></u>'?
          </p>
          <p className={'delete-modal-text-b'}>
            This action cannot be undone!
          </p>
          <div className={'delete-modal-footer'}>
            <ConfirmButton cancelling close={close} />
            <ConfirmButton deleting deleteTaskOrProj={deleteSingleTask} />
          </div>
        </div>
      }
      {project &&
        <div className={[classes.paper]}> 
          <Close onClick={close} className={classes.cross} />
          <ErrorOutlineIcon className={classes.error} color='secondary'/>
          <p className={'delete-modal-text-a'}>
            Are you sure you want to delete the project:
          </p>
          <p className={'delete-modal-prop-data'}>
          '<u><em>{project.proj_name}</em></u>'?
          </p>
          <p className={'delete-modal-text-b'}>
            This action cannot be undone !
          </p>
          <div className={'delete-modal-footer'}>
            <ConfirmButton cancelling close={close}/>
            <ConfirmButton deleting deleteTaskOrProj={deleteSingleProject}/>
          </div>
        </div>
      }
  </>
  );
}