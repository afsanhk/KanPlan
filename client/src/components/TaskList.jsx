import React from "react";
import List from '@material-ui/core/List';

import TaskListItem from "./TaskListItem";

export default function TaskList({ tasks, deleteTask }) {

  const parsedTaskList = tasks.map(task => {
    return (
      <TaskListItem 
        key={task.id}
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