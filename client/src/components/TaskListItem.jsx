import React from "react";

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

import DeleteTaskForm from './DeleteTaskForm';


const useStyles = makeStyles({
  listItem: {
    '&:hover': {
      backgroundColor: '#f5f5f5',
    }
  },
  icon: {
    margin: '2px',
  }
}) 

export default function TaskListItem({ task, deleteTask, id, userID, projectID }) {
  const classes = useStyles();

   // modal state
   const [open, setOpen] = React.useState(false);

   // modal open function
   const handleOpen = () => {
     setOpen(true);
   };
 
   // modal close function
   const handleClose = () => {
     setOpen(false);
   };

  return (
    <>
      <ListItem className={classes.listItem}>
          <ListItemText primary={task.title} />

          <ListItemIcon>

            {/* onClick will trigger the edit modal */}
            <IconButton size='small' className={classes.icon}>
              <EditOutlinedIcon/>
            </IconButton>

            {/* onClick will trigger the delete modal */}
            <IconButton size='small' className={classes.icon} onClick={handleOpen}>
              <DeleteOutlinedIcon/>
            </IconButton>

          </ListItemIcon>

      </ListItem>

      <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      // className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      >
        <Fade in={open}>
          <DeleteTaskForm 
            close={handleClose}
            deleteTask={deleteTask}
            task={task}
          />
        </Fade>
      </Modal>
    </>
  )
}


