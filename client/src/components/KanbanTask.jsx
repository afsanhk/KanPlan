import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import FlagIcon from '@material-ui/icons/Flag';
import { Avatar } from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

import './KanbanTask.scss';

const flagColor = {
  Late: 'rgb(251, 175, 60)',
  'In Progress': 'rgb(213, 60, 60)'
};

function KanbanTask({ task, index }) {
  const parsedUsers = task.task_users.map((user) => {
    return <Avatar alt={user.toString()}>{user}</Avatar>;
  });

  return (
    <Draggable draggableId={task.title} index={index}>
      {(provided, snapshot) => (
        <div className="kanban-task" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} isDragging={snapshot.isDragging}>
          <header className="kanban-task-header">
            <h3>{task.title}</h3>
            {task.status === 'Late' && <FlagIcon style={{ color: flagColor[task.status] }} />}
            {task.status === 'In Progress' && <FlagIcon style={{ color: flagColor[task.status] }} />}
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
