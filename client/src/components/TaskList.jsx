import React from "react";
import List from '@material-ui/core/List';

import TaskListItem from "./TaskListItem";

export default function TaskList({ tasks, deleteTask, editTask, userID, state }) {

  const parsedTaskList = tasks.map(task => {
    return (
      <TaskListItem 
        key={task.id}
        id={task.id}
        userID={userID}
        projectID={task.project_id}
        task={task} 
        deleteTask={deleteTask}
        editTask={editTask}
        state={state}
      /> 
    )
  })

  return (
    <List disablePadding>
      {parsedTaskList}
    </List>
  )

}