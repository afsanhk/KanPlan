import React from "react";
import List from '@material-ui/core/List';

import TaskListItem from "./TaskListItem";

export default function TaskList({ tasks }) {

  const parsedTaskList = tasks.map(task => {
    return (
      <TaskListItem 
        key={task.id}
        task={task} 
      /> 
    )
  })

  return (
    <List>
      {parsedTaskList}
    </List>
  )

}