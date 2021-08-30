import React from 'react';

import { Droppable } from 'react-beautiful-dnd';

import { IconButton } from '@material-ui/core';

import AddCircleIcon from '@material-ui/icons/AddCircle';

import './KanbanBoard.scss';
import KanbanTask from './KanbanTask';

const backgroundColor = {
  Late: 'rgb(213, 60, 60)',
  'To-Do': 'rgb(137, 118, 185)',
  'In Progress': 'rgb(251, 175, 60)',
  Done: 'rgb(106, 168, 79)'
};

function KanbanBoard({ tasks, column }) {
  return (
    <div className="kanban-board" style={{ backgroundColor: backgroundColor[column.title] }}>
      <header className="kanban-board-header">
        <h2>
          {column.title.toUpperCase()} ({tasks.length})
        </h2>
      </header>

      <Droppable droppableId={column.id}>
        {(provided) => (
          <div className="kanban-board-body" ref={provided.innerRef} {...provided.droppableProps}>
            <div className="kanban-board-body-div">
              {tasks.map((task, index) => (
                <KanbanTask key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>

      <footer className="kanban-board-footer">
        <div className="kanban-board-footer-div">
          <IconButton size="small">
            <AddCircleIcon />
          </IconButton>
          <p>Add new task</p>
        </div>
      </footer>
    </div>
  );
}

export default KanbanBoard;
