import {useState} from 'react';

import { ColumnDirective, ColumnsDirective, GanttComponent } from '@syncfusion/ej2-react-gantt';
import "../styles/Gantt.scss"

function SFGantt({ projectTasks }) {
  const [showDates, setShowDates] = useState(true);
  const taskValues = {
    id: 'id',
    name: 'name',
    startDate: 'start_date',
    endDate: 'end_date'
  };

  // Because projectTasks come in as [null] for new projects in state. With new tasks it's [null, task, task]... filter out the null.
  const tasks = projectTasks.filter(el=>el).map(el => {
    const startDate = new Date(Date.parse(el.plan_start))
    const endDate = new Date(Date.parse(el.plan_end))
    return {
      id: el.id,
      name: el.title,
      start_date: startDate,
      end_date: endDate
    }
  }).sort((a,b) => a.start_date - b.start_date);

  return (
    <div>
      <button onClick={() => setShowDates(!showDates)}>{showDates?'Hide Dates':'Show Dates'}</button>
      <GanttComponent dataSource={tasks} taskFields={taskValues}>
        <ColumnsDirective>
          <ColumnDirective field="name" headerText="Task Names" headerTextAlign="Center"></ColumnDirective>
          {showDates && <ColumnDirective field="start_date" format="dd-MMM-yy"></ColumnDirective>}
          {showDates && <ColumnDirective field="end_date" format="dd-MMM-yy"></ColumnDirective>}
        </ColumnsDirective>
      </GanttComponent>
    </div>
  );
}

export default SFGantt;