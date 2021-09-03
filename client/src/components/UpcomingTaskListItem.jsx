import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import Tooltip from '@material-ui/core/Tooltip';
import StarIcon from '@material-ui/icons/Star';
import ListItemText from '@material-ui/core/ListItemText';

import '../styles/UpcomingTaskListItem.scss'

function UpcomingTaskListItem({myTask, taskTitle, taskDesc}) {
  return (
    <ListItem disableGutters divider className='listItem'>
      <ListItemText primary={taskTitle} secondary={taskDesc} />
      {myTask && 
        <Tooltip title="Assigned to me" placement="left">
          <StarIcon color='primary' alt-text="main"/>
        </Tooltip>}
    </ListItem>
  )
}

export default UpcomingTaskListItem
