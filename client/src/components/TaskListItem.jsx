import React from "react";

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import { makeStyles } from '@material-ui/core/styles'; //use this to customize the style

//icons
import IconButton from '@material-ui/core/IconButton'; 
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

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

export default function TaskListItem({ task }) {

  const classes = useStyles();

  return (
    <ListItem className={classes.listItem}>
        <ListItemText primary={task.title} />

        <ListItemIcon>

          {/* onClick will trigger the edit modal */}
          <IconButton size='small' className={classes.icon}>
            <EditOutlinedIcon/>
          </IconButton>

          {/* onClick will trigger the delete modal */}
          <IconButton size='small' className={classes.icon}>
            <DeleteOutlinedIcon/>
          </IconButton>

        </ListItemIcon>

    </ListItem>
  )
}


