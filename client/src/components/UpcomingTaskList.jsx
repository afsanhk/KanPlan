import React from 'react';
import List from '@material-ui/core/List';

//components
import UpcomingTaskListItem from './UpcomingTaskListItem';

//helpers
import convertTimestampStringToYMD from '../helpers/dateConvert';

//projectTasks is a list of task objects cross-referenced by projectID with end_date within 7 days
//pass in 'myTask' as a prop to UpcomingTaskListItem to trigger the star (assigned to me)
function UpcomingTaskList({ projectTasks, userID }) {
  let parsedTaskList;

  const tasks = projectTasks.filter((el) => el);
  //from all projectTasks, narrow it down to which tasks are due in the next 7 days
  if (tasks[0]) {

    const upcomingTasks = tasks.filter((task) => {
      const taskDue = convertTimestampStringToYMD(task.plan_end);

      const taskDueMonth = taskDue[5] !== '0' ? parseInt(taskDue[5] + taskDue[6]) : parseInt(taskDue[6]);
      const taskDueDay = (taskDue[8] !== '0' ? parseInt(taskDue[8] + taskDue[9]) : parseInt(taskDue[9])) + 1;

      const todayFullDate = new Date();
      const todayMonth = Number(todayFullDate.getMonth()) + 1;
      let todayDay = Number(todayFullDate.getDate());

      let sevenDaysFromToday = todayDay + 7;

      const possibleDays = { [todayMonth]: [todayDay] };

      let nextMonth = todayMonth; //if dueDate is at the beginning of the month, will need a new month

      const newDateCalc = function () {
        possibleDays[nextMonth] = [];

        for (let i = sevenDaysFromToday; i >= 1; i--) {
          possibleDays[nextMonth].push(i);
        }
      };

      if (sevenDaysFromToday > 28 && todayMonth === 2) {
        sevenDaysFromToday = sevenDaysFromToday - 28;
        nextMonth++;
        newDateCalc();
      } else if (sevenDaysFromToday > 30) {
        if (todayMonth === 4 || todayMonth === 6 || todayMonth === 9 || todayMonth === 11) {
          sevenDaysFromToday = sevenDaysFromToday - 30;
          nextMonth++;
          newDateCalc();
        }
      } else if (sevenDaysFromToday > 31) {
        if (todayMonth === 1 || todayMonth === 3 || todayMonth === 5 || todayMonth === 7 || todayMonth === 8 || todayMonth === 10) {
          sevenDaysFromToday = sevenDaysFromToday - 31;
          nextMonth++;
          newDateCalc();
        }
      } else if (sevenDaysFromToday > 31 && todayMonth === 12) {
        sevenDaysFromToday = sevenDaysFromToday - 31;
        nextMonth = 1;
        newDateCalc();
      } else {
        for (let i = 0; i < 6; i++) {
          todayDay++;
          possibleDays[todayMonth].push(todayDay);
        }
      }

      if (possibleDays[taskDueMonth] && possibleDays[taskDueMonth].includes(taskDueDay) && task.status !== 'Done') {
        return true;
      }

      return false;
    });

    upcomingTasks.filter(el => el)

    if (upcomingTasks[0]) {
      parsedTaskList = upcomingTasks.map((task, index) => {
        const assignedToUser = task.task_users.includes(parseInt(userID));

        return <UpcomingTaskListItem myTask={assignedToUser} taskTitle={task.title} taskDesc={task.task_description} />;
      });
    }
  }

  return <List disablePadding>{parsedTaskList}</List>;
}

export default UpcomingTaskList;
