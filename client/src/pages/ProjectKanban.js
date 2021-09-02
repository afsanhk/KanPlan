import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { DragDropContext } from 'react-beautiful-dnd';

import { getTasksForProject } from '../helpers/selectors';

// import component
import KanbanBoard from '../components/KanbanBoard';
import LinkIconContainer from '../components/LinkIconContainer';

// import css
import '../styles/ProjectKanban.scss';
import axios from 'axios';

const ProjectKanban = ({ state, addTask, updateTaskStatus, updateKanbanStatus, kanbanStatus, updateTaskKanbanOrder }) => {
  // Taking it from Params causes issues with projects that don't have tasks. To remove the error, put projectID in state and comment out below lines.
  let { projectID } = useParams();
  projectID = Number(projectID);

  useEffect(() => {
    // get kanban status data
    axios
      .get(`http://localhost:8001/api/kanban/project/${projectID}`)
      .then((res) => {
        updateKanbanStatus(res.data);
      })
      .then(() => {
        kanbanStatus[0].task_id.map((id) => id.toString());
        kanbanStatus[1].task_id.map((id) => id.toString());
        kanbanStatus[2].task_id.map((id) => id.toString());
        kanbanStatus[3].task_id.map((id) => id.toString());
      });
    console.log(kanbanStatus);
  }, [projectID]);

  const moveInArray = function (arr, from, to) {
    if (Object.prototype.toString.call(arr) !== '[object Array]') {
      throw new Error('Please provide a valid array');
    }

    const item = arr.splice(from, 1);

    if (!item.length) {
      throw new Error('There is no item in the array at index' + from);
    }

    arr.splice(to, 0, item[0]);
  };

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
    const initialData = {
      tasks: {},
      columns: {
        'column-1': {
          id: 'column-1',
          title: 'Late',
          taskIds: kanbanStatus[1].task_id
        },
        'column-2': {
          id: 'column-2',
          title: 'To-Do',
          taskIds: kanbanStatus[0].task_id
        },
        'column-3': {
          id: 'column-3',
          title: 'In Progress',
          taskIds: kanbanStatus[2].task_id
        },
        'column-4': {
          id: 'column-4',
          title: 'Done',
          taskIds: kanbanStatus[3].task_id
        }
      },
      columnOrder: ['column-1', 'column-2', 'column-3', 'column-4']
    };
    projectTasks.forEach((task) => {
      if (task) {
        initialData.tasks[task.id] = task;
      }
    });
    setKanbanState(initialData);
  }, [state, kanbanStatus]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

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

    const updatedTaskState = {
      id: kanbanState.tasks[draggableId].id,
      title: draggableId,
      status: finish.title,
      status_id: statusToID[finish.title]
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

      const stateCopy = JSON.parse(JSON.stringify(state));
      newTaskIds.forEach((id, index) => {
        stateCopy.tasks[id].kanban_order = index;
      });
      stateCopy.tasks[draggableId] = { ...stateCopy.tasks[draggableId], ...updatedTaskState };

      updateTaskStatus(updatedTaskState);

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
    updateTaskStatus(updatedTaskState);

    const stateCopy = JSON.parse(JSON.stringify(state));
    startTaskIds.forEach((id, index) => {
      stateCopy.tasks[id].kanban_order = index;
    });
    finishTaskIds.forEach((id, index) => {
      stateCopy.tasks[id].kanban_order = index;
    });
    stateCopy.tasks[draggableId] = { ...stateCopy.tasks[draggableId], ...updatedTaskState };

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

    setKanbanState(newState);
  };

  const projectTitle = state.projects[projectID].proj_name;
  const projectDescription = state.projects[projectID].proj_description;

  return (
    <div className="project-kanban">
      <div className="project-kanban-header">
        <div className="project-kanban-title">
          <h1>{projectTitle}</h1>
          <LinkIconContainer projectID={projectID} text />
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
