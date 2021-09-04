import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { DragDropContext } from 'react-beautiful-dnd';

import { getTasksForProject } from '../helpers/selectors';

// import component
import KanbanBoard from '../components/KanbanBoard';
import LinkIconContainer from '../components/LinkIconContainer';

// import css
import '../styles/ProjectKanban.scss';

const ProjectKanban = ({ state, addTask, updateKanbanBoard, getKanbanStatus, kanbanStatus, updateProjectUsers, updateTaskStatus }) => {
  // Taking it from Params causes issues with projects that don't have tasks. To remove the error, put projectID in state and comment out below lines.
  let { projectID } = useParams();
  projectID = Number(projectID);
  // get kanban status from api

  useEffect(() => {
    getKanbanStatus(projectID);
  }, [projectID, state.projects[projectID].project_tasks]);

  const initialData = {
    tasks: {},
    columns: {
      'column-1': {
        id: 'column-1',
        title: 'Late',
        taskIds: []
      },
      'column-2': {
        id: 'column-2',
        title: 'To-Do',
        taskIds: []
      },
      'column-3': {
        id: 'column-3',
        title: 'In Progress',
        taskIds: []
      },
      'column-4': {
        id: 'column-4',
        title: 'Done',
        taskIds: []
      }
    },
    columnOrder: ['column-1', 'column-2', 'column-3', 'column-4']
  };

  const [kanbanState, setKanbanState] = useState(initialData);

  useEffect(() => {
    const projectTasks = getTasksForProject(state, projectID).map((i) => state.tasks[i]);

    kanbanStatus.forEach((obj) => {
      if (obj.status === 'Late') {
        if (obj) {
          initialData.columns['column-1'].taskIds = obj.task_id;
        }
      } else if (obj.status === 'To-Do') {
        if (obj) {
          initialData.columns['column-2'].taskIds = obj.task_id;
        }
      } else if (obj.status === 'In Progress') {
        if (obj) {
          initialData.columns['column-3'].taskIds = obj.task_id;
        }
      } else if (obj.status === 'Done') {
        if (obj) {
          initialData.columns['column-4'].taskIds = obj.task_id;
        }
      }
    });

    projectTasks.forEach((task) => {
      if (task) {
        initialData.tasks[task.id] = task;
      }
    });
    setKanbanState((prev) => ({ ...prev, ...initialData }));
  }, [kanbanStatus]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    const stateCopy = JSON.parse(JSON.stringify(state.tasks));

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const start = kanbanState.columns[source.droppableId];
    const finish = kanbanState.columns[destination.droppableId];

    const statusToID = {
      'To-Do': 1,
      Late: 2,
      'In Progress': 3,
      Done: 4
    };

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds
      };

      const newState = {
        ...kanbanState,
        columns: {
          ...kanbanState.columns,
          [newColumn.id]: newColumn
        }
      };

      newTaskIds.forEach((id, index) => {
        // stateCopy.tasks[id].status = finish.title;
        // stateCopy.tasks[id].status_id = statusToID[finish.title];
        // stateCopy.tasks[id].kanban_order = index;
        updateTaskStatus({ status: finish.title, status_id: statusToID[finish.title], kanban_order: index }, parseInt(id));
      });

      // updateKanbanBoard(stateCopy, newTaskIds);

      setKanbanState(newState);
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    const currentTask = startTaskIds[source.index];
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);

    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    };

    startTaskIds.forEach((id, index) => {
      // stateCopy.tasks[id].status = start.title;
      // stateCopy.tasks[id].status_id = statusToID[start.title];
      // stateCopy.tasks[id].kanban_order = index;
      updateTaskStatus({ status: start.title, status_id: statusToID[start.title], kanban_order: index }, parseInt(id));
    });
    finishTaskIds.forEach((id, index) => {
      // stateCopy.tasks[id].status = finish.title;
      // stateCopy.tasks[id].status_id = statusToID[finish.title];
      // stateCopy.tasks[id].kanban_order = index;
      updateTaskStatus({ status: finish.title, status_id: statusToID[finish.title], kanban_order: index }, parseInt(id));
    });

    // updateKanbanBoard(stateCopy, [...startTaskIds, ...finishTaskIds]);

    const columnToStatus = {
      'column-1': {
        status: 'Late',
        status_id: 2
      },
      'column-2': {
        status: 'To-Do',
        status_id: 1
      },
      'column-3': {
        status: 'In Progress',
        status_id: 3
      },
      'column-4': {
        status: 'Done',
        status_id: 4
      }
    };

    const newState = {
      ...kanbanState,
      columns: {
        ...kanbanState.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      },
      tasks: {
        ...kanbanState.tasks,
        [currentTask]: {
          ...kanbanState.tasks[currentTask],
          ...columnToStatus[destination.droppableId]
        }
      }
    };

    setKanbanState((prev) => ({ ...prev, ...newState }));
  };

  const projectTitle = state.projects[projectID].proj_name;
  const projectDescription = state.projects[projectID].proj_description;

  return (
    <div className="project-kanban">
      <div className="project-kanban-header">
        <div className="project-kanban-title">
          <h1>{projectTitle}</h1>
          <LinkIconContainer projectID={projectID} text state={state} updateProjectUsers={updateProjectUsers} />
        </div>
        <p>{projectDescription}</p>
      </div>

      <div className="project-kanban-body">
        <div className="project-kanban-body-div">
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="project-kanban-board">
              {kanbanState.columnOrder.map((columnId) => {
                const column = kanbanState.columns[columnId];
                const tasks = column.taskIds.map((taskId) => kanbanState.tasks[taskId]);
                return <KanbanBoard key={column.id} column={column} tasks={tasks} state={state} projectID={projectID} addTask={addTask} />;
              })}
            </div>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default ProjectKanban;
