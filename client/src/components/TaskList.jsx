import React from "react";
import List from '@material-ui/core/List';

import TaskListItem from "./TaskListItem";

export default function TaskList({ tasks, deleteTask, userID }) {

  const parsedTaskList = tasks.map(task => {
    return (
      <TaskListItem 
        key={task.id}
        id={task.id}
        userID={userID}
        projectID={task.project_id}
        task={task} 
        deleteTask={deleteTask}
      /> 
    )
  })

  return (
    <List>
      {parsedTaskList}
    </List>
  )

}