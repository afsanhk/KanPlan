import React from 'react';
import {FrappeGantt, Task, ViewMode} from 'frappe-gantt-react';

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

function Gantt() {
  return (
    <FrappeGantt
      tasks={tasks}
      viewMode={ViewMode.Week}
      onClick={(task) => console.log(task)}
      onDateChange={(task, start, end) => console.log(task, start, end)}
      onProgressChange={(task, progress) => console.log(task, progress)}
      onTasksChange={(tasks) => console.log(tasks)}
      // onViewChange={this._func}
    />
  )
}

export default Gantt;