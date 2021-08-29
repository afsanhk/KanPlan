import React from 'react';

import { IconButton } from '@material-ui/core';

import AddCircleIcon from '@material-ui/icons/AddCircle';

import './KanbanBoard.scss';

function KanbanBoard() {
  return (
    <div className="kanban-board">
      <header className="kanban-board-header">
        <h2>Board Title</h2>
      </header>

      <div className="kanban-board-body"></div>

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
