import React from "react";

import IconButton from '@material-ui/core/IconButton'; 
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import "./HomepageMyWork.scss"
import TaskList from "./TaskList"

export default function HomepageMyWork(props) {

  const { tasks } = props

  return (
    <div>
      <h2><strong>My Work</strong></h2>
  
      <div class='user-tasks-title'>
        <div class='user-tasks-left'>
            <CheckCircleOutlinedIcon />
          <h3>Tasks</h3>
        </div>
        <div class='user-tasks-right'>
          <IconButton size='medium' >
            <AddCircleIcon />
          </IconButton>
        </div>
      </div>

      <TaskList tasks={tasks} />

    </div>
  );
}