import React, { useEffect, useRef, useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import Tooltip from '@material-ui/core/Tooltip';
import StarIcon from '@material-ui/icons/Star';
import ListItemText from '@material-ui/core/ListItemText';

import { makeStyles } from '@material-ui/core/styles'; //use this to customize the style

import '../styles/UpcomingTaskListItem.scss';

const useStyles = makeStyles({
  star: {
    marginLeft: '10px'
  }
});

function UpcomingTaskListItem({ myTask, taskTitle, taskDesc }) {
  const classes = useStyles();
  const titleRef = useRef(null);
  const [disableHover, setDisableHover] = useState(true);

  useEffect(() => {
    if (titleRef.current.firstChild.clientWidth < titleRef.current.firstChild.scrollWidth) {
      setDisableHover(false);
    } else {
      setDisableHover(true);
    }
  }, [taskTitle]);

  return (
    <ListItem disableGutters divider className="listItem">
      <Tooltip title={taskTitle} placement="top-start" disableHoverListener={disableHover}>
        <ListItemText primary={taskTitle} secondary={taskDesc} ref={titleRef} />
      </Tooltip>
      {myTask && (
        <Tooltip title="Assigned to me" placement="left">
          <StarIcon color="primary" alt-text="main" className={classes.star} />
        </Tooltip>
      )}
    </ListItem>
  );
}

export default UpcomingTaskListItem;
