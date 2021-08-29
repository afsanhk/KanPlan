import React from 'react';

import FlagIcon from '@material-ui/icons/Flag';

import './KanbanTask.scss';
import { Avatar } from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

const flagColor = {
  Late: 'rgb(251, 175, 60)',
  'In Progress': 'rgb(213, 60, 60)'
};

function KanbanTask({ task }) {
  const parsedUsers = task.task_users.map((user) => {
    return <Avatar alt={user}>{user}</Avatar>;
  });

  return (
    <div className="kanban-task">
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
          <div class="project-grouped-users">
            <AvatarGroup max={4}>{parsedUsers}</AvatarGroup>
          </div>
        )}
      </footer>
    </div>
  );
}

export default KanbanTask;
