import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { DragDropContext } from 'react-beautiful-dnd';

import { getTasksForProject } from '../helpers/selectors';

// import component
import KanbanBoard from '../components/KanbanBoard';
import LinkIconContainer from '../components/LinkIconContainer';

// import css
import '../styles/ProjectKanban.scss';

import useApplicationData from '../hooks/useApplicationData';

const ProjectKanban = ({ state }) => {
  // Taking it from Params causes issues with projects that don't have tasks. To remove the error, put projectID in state and comment out below lines.
  let { projectID } = useParams();
  projectID = Number(projectID);

  const { updateTask } = useApplicationData();

  const projectTasks = getTasksForProject(state, projectID).map((i) => state.tasks[i]);
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
  projectTasks.forEach((task) => {
    if (task) {
      initialData.tasks[task.title] = task;
      if (task.status === 'Late') {
        initialData.columns['column-1'].taskIds.push(task.title);
      } else if (task.status === 'To-Do') {
        initialData.columns['column-2'].taskIds.push(task.title);
      } else if (task.status === 'In Progress') {
        initialData.columns['column-3'].taskIds.push(task.title);
      } else if (task.status === 'Done') {
        initialData.columns['column-4'].taskIds.push(task.title);
      }
    }
  });

  const [kanbanState, setKanbanState] = useState(initialData);

  // if (state && getTasksForProject(state, projectID)[0]) {
  // projectTasks = getTasksForProject(state, projectID).map((i) => state.tasks[i]);
  // } else {
  //   // For Kanban Layout
  //   projectTasks = [
  //     {
  //       id: 1,
  //       title: 'API Routes',
  //       task_description: 'Set up API Routes',
  //       priority_id: 3,
  //       status_id: 1,
  //       project_id: 1,
  //       plan_start: '2021-08-26T18:08:57.766Z',
  //       plan_end: '2021-08-27T18:08:57.766Z',
  //       proj_name: 'KanPlan',
  //       priority_name: 'High',
  //       status: 'To-Do',
  //       task_users: [2]
  //     },
  //     {
  //       id: 2,
  //       title: 'React Components',
  //       task_description: 'Build react components',
  //       priority_id: 2,
  //       status_id: 1,
  //       project_id: 1,
  //       plan_start: '2021-08-29T18:08:57.766Z',
  //       plan_end: '2021-09-06T18:08:57.766Z',
  //       proj_name: 'KanPlan',
  //       priority_name: 'Low',
  //       status: 'To-Do',
  //       task_users: [1, 2, 3]
  //     },
  //     {
  //       id: 3,
  //       title: 'Kanban DnD',
  //       task_description: 'Build Kanban containers and drag and drop',
  //       priority_id: 2,
  //       status_id: 1,
  //       project_id: 1,
  //       plan_start: '2021-08-29T18:08:57.766Z',
  //       plan_end: '2021-09-03T18:08:57.766Z',
  //       proj_name: 'KanPlan',
  //       priority_name: 'Low',
  //       status: 'To-Do',
  //       task_users: [1]
  //     },
  //     {
  //       id: 4,
  //       title: 'Relax',
  //       task_description: 'Relax a bit',
  //       priority_id: 1,
  //       status_id: 2,
  //       project_id: 1,
  //       plan_start: '2021-09-01T18:08:57.766Z',
  //       plan_end: '2021-09-03T18:08:57.766Z',
  //       proj_name: 'KanPlan',
  //       priority_name: 'None',
  //       status: 'Late',
  //       task_users: [1, 2, 3]
  //     },
  //     {
  //       id: 5,
  //       title: 'Seeds',
  //       task_description: 'Making api seeds',
  //       priority_id: 3,
  //       status_id: 3,
  //       project_id: 1,
  //       plan_start: '2021-09-01T18:08:57.766Z',
  //       plan_end: '2021-09-02T18:08:57.766Z',
  //       proj_name: 'KanPlan',
  //       priority_name: 'High',
  //       status: 'In Progress',
  //       task_users: [1, 2]
  //     }
  //   ];
  // }

  useEffect(() => {
    const projectTasks = Object.values(state.tasks).filter((value) => value.project_id === projectID);
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
    projectTasks.forEach((task) => {
      if (task) {
        initialData.tasks[task.title] = task;
        if (task.status === 'Late') {
          initialData.columns['column-1'].taskIds.push(task.title);
        } else if (task.status === 'To-Do') {
          initialData.columns['column-2'].taskIds.push(task.title);
        } else if (task.status === 'In Progress') {
          initialData.columns['column-3'].taskIds.push(task.title);
        } else if (task.status === 'Done') {
          initialData.columns['column-4'].taskIds.push(task.title);
        }
      }
    });
    setKanbanState(initialData);
  }, [state]);

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

    updateTask(updatedTaskState);

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
          <LinkIconContainer projectID={projectID} />
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

                return <KanbanBoard key={column.id} column={column} tasks={tasks} state={state} projectID={projectID} />;
              })}
            </div>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default ProjectKanban;
