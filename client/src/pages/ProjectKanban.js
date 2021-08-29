import React, { useState } from 'react';
import KanbanBoard from '../components/KanbanBoard';
import './ProjectKanban.scss';

// For Kanban Layout
const projectTasks = [
  {
    id: 1,
    title: 'API Routes',
    task_description: 'Set up API Routes',
    priority_id: 3,
    status_id: 1,
    project_id: 1,
    plan_start: '2021-08-26T18:08:57.766Z',
    plan_end: '2021-08-27T18:08:57.766Z',
    proj_name: 'KanPlan',
    priority_name: 'High',
    status: 'To-Do',
    task_users: [2]
  },
  {
    id: 2,
    title: 'React Components',
    task_description: 'Build react components',
    priority_id: 2,
    status_id: 1,
    project_id: 1,
    plan_start: '2021-08-29T18:08:57.766Z',
    plan_end: '2021-09-06T18:08:57.766Z',
    proj_name: 'KanPlan',
    priority_name: 'Low',
    status: 'To-Do',
    task_users: [1, 2, 3]
  },
  {
    id: 3,
    title: 'Kanban DnD',
    task_description: 'Build Kanban containers and drag and drop',
    priority_id: 2,
    status_id: 1,
    project_id: 1,
    plan_start: '2021-08-29T18:08:57.766Z',
    plan_end: '2021-09-03T18:08:57.766Z',
    proj_name: 'KanPlan',
    priority_name: 'Low',
    status: 'To-Do',
    task_users: [1]
  },
  {
    id: 4,
    title: 'Relax',
    task_description: 'Relax a bit',
    priority_id: 1,
    status_id: 2,
    project_id: 1,
    plan_start: '2021-09-01T18:08:57.766Z',
    plan_end: '2021-09-03T18:08:57.766Z',
    proj_name: 'KanPlan',
    priority_name: 'None',
    status: 'Late',
    task_users: [1, 2, 3]
  },
  {
    id: 5,
    title: 'Seeds',
    task_description: 'Making api seeds',
    priority_id: 3,
    status_id: 3,
    project_id: 1,
    plan_start: '2021-09-01T18:08:57.766Z',
    plan_end: '2021-09-02T18:08:57.766Z',
    proj_name: 'KanPlan',
    priority_name: 'High',
    status: 'In Progress',
    task_users: [1, 2]
  }
];

const initialData = {
  tasks: {},
  columns: {
    Late: {
      id: 'column-1',
      title: 'Late',
      taskNames: []
    },
    'To-Do': {
      id: 'column-2',
      title: 'To-Do',
      taskNames: []
    },
    'In Progress': {
      id: 'column-3',
      title: 'In Progress',
      taskNames: []
    },
    Done: {
      id: 'column-4',
      title: 'Done',
      taskNames: []
    }
  },
  columnOrder: ['Late', 'To-Do', 'In Progress', 'Done']
};

projectTasks.forEach((task) => {
  initialData.tasks[task.title] = task;
  if (task.status === 'Late') {
    initialData.columns['Late'].taskNames.push(task.title);
  } else if (task.status === 'To-Do') {
    initialData.columns['To-Do'].taskNames.push(task.title);
  } else if (task.status === 'In Progress') {
    initialData.columns['In Progress'].taskNames.push(task.title);
  } else if (task.status === 'Done') {
    initialData.columns['Done'].taskNames.push(task.title);
  }
});

const lateTasks = projectTasks.filter((task) => task.status === 'Late');
const toDoTasks = projectTasks.filter((task) => task.status === 'To-Do');
const inProgressTasks = projectTasks.filter((task) => task.status === 'In Progress');
const doneTasks = projectTasks.filter((task) => task.status === 'Done');

const ProjectKanban = () => {
  const [state, setState] = useState(initialData);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn
        }
      };

      setState(newState);
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
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

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    };

    setState(newState);
  };

  return (
    <div className="project-kanban">
      <h1>This will show the project Kanban.</h1>

      <div className="project-kanban-board">
        <KanbanBoard status={'Late'} tasks={lateTasks} />
        <KanbanBoard status={'To-Do'} tasks={toDoTasks} />
        <KanbanBoard status={'In Progress'} tasks={inProgressTasks} />
        <KanbanBoard status={'Done'} tasks={doneTasks} />
      </div>
    </div>
  );
};

export default ProjectKanban;
