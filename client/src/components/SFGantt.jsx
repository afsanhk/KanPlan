import { ColumnDirective, ColumnsDirective, GanttComponent } from '@syncfusion/ej2-react-gantt';

import "../styles/Gantt.scss"

function SFGantt({ projectTasks }) {
  const taskValues = {
    id: 'id',
    name: 'name',
    startDate: 'start_date',
    endDate: 'end_date'
  };

  const tasks = projectTasks[0] && 
  projectTasks.map(el => {
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
      <GanttComponent dataSource={tasks} taskFields={taskValues}>
        <ColumnsDirective>
          <ColumnDirective field="name" headerText="Task Name" headerTextAlign="Left"></ColumnDirective>
          <ColumnDirective field="start_date" format="dd-MMM-yy"></ColumnDirective>
          <ColumnDirective field="end_date" format="dd-MMM-yy"></ColumnDirective>
        </ColumnsDirective>
      </GanttComponent>
    </div>
  );
}

export default SFGantt;