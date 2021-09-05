import React, { useEffect, useRef, useState } from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import { makeStyles } from '@material-ui/core/styles'; //use this to customize the style

//icons
import IconButton from '@material-ui/core/IconButton';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

//For the edit and delete modals
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import EditTaskForm from './EditTaskForm';
import DeleteTaskForm from './DeleteTaskForm';

//helpers
import { getProjectsForUser } from '../helpers/selectors';
import { Tooltip } from '@material-ui/core';

import '../styles/TaskListItem.scss';

const useStyles = makeStyles({
  listItem: {
    '&:hover': {
      backgroundColor: '#f5f5f5'
    }
  },
  icon: {
    margin: '0 2px'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default function TaskListItem({ task, deleteTask, editTask, userID, projectID, state }) {
  const classes = useStyles();

  const [openEdit, setOpenEdit] = useState(false); // modal state -- edit modal
  const [openDelete, setOpenDelete] = useState(false); // modal state -- delete modal
  const [visibility, setVisibility] = useState({ display: 'none' });

  const projectsArray = getProjectsForUser(state, userID).map((key) => state.projects[key]);

  // modal open function - edit modal
  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  // modal close function - edit modal
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  // modal open function - delete modal
  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  // modal close function - delete modal
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const titleRef = useRef(null);
  const [disableHover, setDisableHover] = useState(true);

  useEffect(() => {
    if (titleRef.current.firstChild.clientWidth < titleRef.current.firstChild.scrollWidth) {
      setDisableHover(false);
    } else {
      setDisableHover(true);
    }
  }, [task.title]);

  return (
    <>
      <ListItem
        divider
        className={classes.listItem}
        onMouseEnter={() => {
          setVisibility({ display: 'block' });
        }}
        onMouseLeave={() => {
          setVisibility({ display: 'none' });
        }}
      >
        <Tooltip title={task.title} placement="top-start" disableHoverListener={disableHover}>
          <ListItemText primary={task.title} ref={titleRef} className="task-list-item-title" />
        </Tooltip>

        <ListItemIcon>
          {/* onClick will trigger the edit modal */}
          <IconButton size="small" className={classes.icon} onClick={handleOpenEdit} style={visibility}>
            <EditOutlinedIcon />
          </IconButton>

          {/* onClick will trigger the delete modal */}
          <IconButton size="small" className={classes.icon} onClick={handleOpenDelete} style={visibility}>
            <DeleteOutlinedIcon />
          </IconButton>
        </ListItemIcon>
      </ListItem>

      {/* edit modal */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openEdit}
        onClose={handleCloseEdit}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={openEdit}>
          <EditTaskForm
            close={handleCloseEdit}
            editTask={editTask}
            tasks={task} //data about only this task
            users={state.users}
            projects={projectsArray}
          />
        </Fade>
      </Modal>

      {/* delete modal */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        // className={classes.modal}
        open={openDelete}
        onClose={handleCloseDelete}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={openDelete}>
          <DeleteTaskForm close={handleCloseDelete} deleteTask={deleteTask} task={task} userID={userID} projectID={projectID} />
        </Fade>
      </Modal>
    </>
  );
}
