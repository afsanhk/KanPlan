import React from 'react';
import {FrappeGantt, Task, ViewMode} from 'frappe-gantt-react';

function Gantt() {
const ourTasks = [
  {
    id: 1,
    title: "API Routes",
    task_description: "Set up API Routes",
    priority_id: 3,
    status_id: 1,
    project_id: 1,
    plan_start: "2021-08-26T18:08:57.766Z",
    plan_end: "2021-08-27T18:08:57.766Z",
    proj_name: "KanPlan",
    priority_name: "High",
    status: "To-Do",
    task_users: [
      2
    ]
  },
  {
    id: 2,
    title: "React Components",
    task_description: "Build react components",
    priority_id: 2,
    status_id: 1,
    project_id: 1,
    plan_start: "2021-08-29T18:08:57.766Z",
    plan_end: "2021-09-06T18:08:57.766Z",
    proj_name: "KanPlan",
    priority_name: "Low",
    status: "To-Do",
    task_users: [
      1,
      2,
      3
    ]
  },
  {
    id: 3,
    title: "Kanban DnD",
    task_description: "Build Kanban containers and drag and drop",
    priority_id: 2,
    status_id: 1,
    project_id: 1,
    plan_start: "2021-08-29T18:08:57.766Z",
    plan_end: "2021-09-03T18:08:57.766Z",
    proj_name: "KanPlan",
    priority_name: "Low",
    status: "To-Do",
    task_users: [
      1
    ]
  },
  {
    id: 4,
    title: "Relax",
    task_description: "Relax a bit",
    priority_id: 1,
    status_id: 2,
    project_id: 1,
    plan_start: "2021-09-01T18:08:57.766Z",
    plan_end: "2021-09-03T18:08:57.766Z",
    proj_name: "KanPlan",
    priority_name: "None",
    status: "Late",
    task_users: [
      1,
      2,
      3
    ]
  },
  {
    id: 5,
    title: "Seeds",
    task_description: "Making api seeds",
    priority_id: 3,
    status_id: 3,
    project_id: 1,
    plan_start: "2021-09-01T18:08:57.766Z",
    plan_end: "2021-09-02T18:08:57.766Z",
    proj_name: "KanPlan",
    priority_name: "High",
    status: "In Progress",
    task_users: [
      1,
      2
    ]
  }
]

const ourMappedTasks = ourTasks.map(el => {
  return {
    id: el.id,
    name: el.title,
    start: el.plan_start,
    end: el.plan_end,
    progress: 100,
    dependencies: ''
  }
}).map(x => new Task(x));

const tasks = [
  {
    id: '1',
    name: 'Task 1',
    start: '2021-12-01',
    end: '2021-12-03',
    progress: 10,
    dependencies: ''
  },
  {
    id: '2',
    name: 'Task 2',
    start: '2021-11-16',
    end: '2021-11-30',
    progress: 20,
    dependencies: ''
  },
  {
    id: '3',
    name: 'Task 4',
    start: '2021-11-29',
    end: '2021-11-30',
    progress: 80,
    dependencies: ''
  },
  {
    id: '4',
    name: 'Task 5',
    start: '2021-11-30',
    end: '2021-12-17',
    progress: 30,
    dependencies: ''
  }
].map((x) => new Task(x));

  return (
    <FrappeGantt
      tasks={ourMappedTasks}
      viewMode={ViewMode.Week}
      onClick={(task) => console.log(task)}
      onDateChange={(task, start, end) => console.log(task, start, end)}
      onProgressChange={(task, progress) => console.log(task, progress)}
      onTasksChange={(ourMappedTasks) => console.log(tasks)}
      // https://github.com/mohammed-io/frappe-gantt-react/blob/master/src/App.tsx
      // onViewChange={this._func} --> something to do with class state = {mode: ViewMode.___} 
      // tasks={tasks}
      // viewMode={ViewMode.Week}
      // onClick={(task) => console.log(task)}
      // onDateChange={(task, start, end) => console.log(task, start, end)}
      // onProgressChange={(task, progress) => console.log(task, progress)}
      // onTasksChange={(tasks) => console.log(tasks)}
      // // https://github.com/mohammed-io/frappe-gantt-react/blob/master/src/App.tsx
      // // onViewChange={this._func} --> something to do with class state = {mode: ViewMode.___} 
    />
  )
}

export default Gantt;
