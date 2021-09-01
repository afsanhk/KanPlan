import React from "react";

import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
// if we implement the 'add task' feature from Dashboard -->
// import IconButton from '@material-ui/core/IconButton'; 
// import AddCircleIcon from '@material-ui/icons/AddCircle';

import "../styles/HomepageMyWork.scss"
import TaskList from "./TaskList"

export default function HomepageMyWork({ tasks, deleteTask, userID }) {

  return (
    <div className="homepage-my-work">
      <h2><strong>My Work</strong></h2>
  
      <div className='homepage-tasks-title'>
        <div className='homepage-tasks-left'>
          <CheckCircleOutlinedIcon />
          <h3>Tasks</h3>
        </div>
        {/* <div className='homepage-tasks-right'>
          <IconButton size='medium' >
            <AddCircleIcon />
          </IconButton>
        </div> */}
      </div>

      {tasks[0] && <TaskList tasks={tasks} deleteTask={deleteTask} userID={userID}/>}
      {!tasks[0] && <div>No tasks</div>}
    </div>
  );
}