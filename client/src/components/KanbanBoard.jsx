import React from 'react';

import { Droppable } from 'react-beautiful-dnd';

import { Backdrop, Fade, IconButton, makeStyles, Modal } from '@material-ui/core';

import AddCircleIcon from '@material-ui/icons/AddCircle';

import '../styles/KanbanBoard.scss';
import KanbanTask from './KanbanTask';
import AddTaskForm from './AddTaskForm';

const backgroundColor = {
  Late: 'rgb(213, 60, 60)',
  'To-Do': 'rgb(137, 118, 185)',
  'In Progress': 'rgb(251, 175, 60)',
  Done: 'rgb(106, 168, 79)'
};

// material-ui styles
const useStyles = makeStyles(() => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

function KanbanBoard({ tasks, column, state, projectID, addTask }) {
  const classes = useStyles();

  // modal state
  const [open, setOpen] = React.useState(false);

  // modal open function
  const handleOpen = () => {
    setOpen(true);
  };

  // modal close function
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Droppable droppableId={column.id}>
      {(provided) => (
        <div className="kanban-board" style={{ backgroundColor: backgroundColor[column.title] }} ref={provided.innerRef} {...provided.droppableProps}>
          <header className="kanban-board-header">
            <h2>
              {column.title.toUpperCase()} ({tasks.length})
            </h2>
            <div className="kanban-board-header-button">
              <IconButton size="small" onClick={handleOpen}>
                <AddCircleIcon />
              </IconButton>

              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500
                }}
              >
                <Fade in={open}>
                  <AddTaskForm
                    proj_name={state.projects[projectID].proj_name}
                    team_members={state.projects[projectID].team_members}
                    users={state.users}
                    close={handleClose}
                    projectID={projectID}
                    status={column.title}
                    addTask={addTask}
                  />
                </Fade>
              </Modal>
            </div>
          </header>

          <div className="kanban-board-body">
            <div className="kanban-board-body-div" style={{ height: !tasks.length && '150px' }}>
              {tasks.map((task, index) => (
                <>{task && <KanbanTask key={task.id} task={task} index={index} state={state} />}</>
              ))}
              {provided.placeholder}
            </div>
          </div>
        </div>
      )}
    </Droppable>
  );
}

export default KanbanBoard;
