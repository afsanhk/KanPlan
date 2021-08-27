import React from "react";
import List from '@material-ui/core/List';

import TaskListItem from "./TaskListItem";



export default function TaskList(props) {

  const { tasks } = props //will need to change this when we see how the props get passed in

  const parsedTaskList = tasks.map((task) => {
    return (
      <TaskListItem 
        key={task.id}
        title={task.title} /> )
  })

  return (
    <List>
      {parsedTaskList}
    </List>
  )

}