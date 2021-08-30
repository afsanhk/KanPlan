import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import FlagIcon from '@material-ui/icons/Flag';
import { Avatar } from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

import './KanbanTask.scss';

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

function KanbanTask({ task, index }) {
  const parsedUsers = task.task_users.map((user) => {
    return <Avatar alt={user.toString()}>{user}</Avatar>;
  });

  return (
    <Draggable key={task.id} draggableId={task.title} index={index}>
      {(provided) => (
        <div className="kanban-task" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <header className="kanban-task-header">
            <h3>{task.title}</h3>
            <FlagIcon style={flagStyles[task.priority_name]} />
          </header>

          <div className="kanban-task-body">
            <p>{task.task_description}</p>
          </div>

          <footer className="kanban-task-footer">
            {task.task_users && (
              <div className="project-grouped-users">
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
