import React, { useContext, useEffect, useRef, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import FlagIcon from '@material-ui/icons/Flag';
import { Avatar, Tooltip } from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

//helpers
import avatarBGColor from '../helpers/avatarBG';
import { makeStyles } from '@material-ui/styles';

import '../styles/KanbanTask.scss';
import { imageContext } from '../providers/ImagePorvider';

const useStyles = makeStyles((theme) => ({
  taskTitle: {
    whiteSpace: 'nowrap',
    maxWidth: '280px',
    // width: '100px',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
}));

const flagStyles = {
  High: {
    color: 'rgb(213, 60, 60)'
  },
  Low: {
    color: 'rgb(251, 175, 60)'
  },
  None: {
    display: 'none'
  }
};
function KanbanTask({ task, index, state }) {
  const classes = useStyles();
  const { imageSrc, imageUserID } = useContext(imageContext);
  const titleRef = useRef(null);
  const [disableHover, setDisableHover] = useState(true);

  const parsedUsers = task.task_users.map((user) => {
    const userDetails = state.users[user];
    let avatarBG = avatarBGColor(userDetails.id);

    return (
      <Tooltip title={userDetails.user_name}>
        {imageUserID === userDetails.id ? (
          <Avatar alt={userDetails.user_name} src={imageSrc} style={{ 'background-color': avatarBG }} />
        ) : (
          <Avatar alt={userDetails.user_name} src={`https://robohash.org/${userDetails.id}`} style={{ 'background-color': avatarBG }} />
        )}
      </Tooltip>
    );
  });

  useEffect(() => {
    if (titleRef.current.clientWidth < titleRef.current.scrollWidth) setDisableHover(false);
  }, []);

  return (
    <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <div className="kanban-task" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <header className="kanban-task-header">
            <Tooltip title={task.title} disableHoverListener={disableHover}>
              <h3 className={classes.taskTitle} ref={titleRef}>
                {task.title}
              </h3>
            </Tooltip>
            <FlagIcon style={flagStyles[task.priority_name]} />
          </header>

          <div className="kanban-task-body">
            <p>
              <span>{task.task_description}</span>
            </p>
          </div>

          <footer className="kanban-task-footer">
            {task.task_users && (
              <div className="kanban-task-footer-div">
                <AvatarGroup max={4}>{parsedUsers}</AvatarGroup>
              </div>
            )}
          </footer>
        </div>
      )}
    </Draggable>
  );
}

export default KanbanTask;
