import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import Tooltip from '@material-ui/core/Tooltip';
import StarIcon from '@material-ui/icons/Star';
import ListItemText from '@material-ui/core/ListItemText';

import { makeStyles } from '@material-ui/core/styles'; //use this to customize the style

import '../styles/UpcomingTaskListItem.scss'

const useStyles = makeStyles({
  star: {
    marginLeft: '10px'
  }
});

function UpcomingTaskListItem({myTask, taskTitle, taskDesc}) {
  const classes = useStyles();

  return (
    <ListItem disableGutters divider className='listItem'>
      <ListItemText primary={taskTitle} secondary={taskDesc} />
      {myTask && 
        <Tooltip title="Assigned to me" placement="left">
          <StarIcon color='primary' alt-text="main" className={classes.star} />
        </Tooltip>}
    </ListItem>
  )
}

export default UpcomingTaskListItem
