import {useState} from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { ColumnDirective, ColumnsDirective, GanttComponent } from '@syncfusion/ej2-react-gantt';
import "../styles/Gantt.scss"

const useStyles = makeStyles({
  ganttButton: {
    backgroundColor: '#3d6bb3',
    fontSize: 13,
    marginBottom: 5,
    marginRight: 5,
    color: '#fcfcfc',
    '&:hover': {
      backgroundColor: '#1e88e5',
    },

  }
}) 

function SFGantt({ projectTasks }) {
  const [showDates, setShowDates] = useState(true);
  const [showDone, setShowDone] = useState(true);
  const taskValues = {
    id: 'id',
    name: 'name',
    startDate: 'start_date',
    endDate: 'end_date'
  };

  const classes = useStyles();

  if(!showDone){
    projectTasks = projectTasks.filter(el => el.status_id !== 4) // 4 is status 'Done'
  }

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
      <Button onClick={() => setShowDates(!showDates)} className={classes.ganttButton}>{showDates?'Task Names':'Dates'}</Button>
      <Button onClick={() => setShowDone(!showDone)} className={classes.ganttButton}>{showDone?'Hide Completed Tasks':'Show Completed Tasks'}</Button>
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