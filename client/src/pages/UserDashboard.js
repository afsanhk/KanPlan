import React from 'react';

//components
import HomepageMyWork from '../components/HomepageMyWork';
import HomepageImportantUpdates from '../components/HomepageImportantUpdates';
import HomepageMyProjects from '../components/HomepageMyProjects';
import HomepageCharts from '../components/HomepageCharts';

//helpers
import {  getProjectsForUser, getTasksForUser, getProjectsManagingForUser, getTaskStatuses } from '../helpers/selectors';

import './UserDashboard.scss'

const UserDashboard = ({ state, userID }) => {

  const name = state.users[userID].user_name;
  const tasks = getTasksForUser(state, userID)
  const projects = getProjectsForUser(state, userID).map(index => state.projects[index]) //array (of objs) with all project details
  const projectsManaging = getProjectsManagingForUser(state, userID)
  const projectsWorkingOn = getProjectsForUser(state, userID).length
  const taskStatuses = getTaskStatuses(state, userID)

  return (
    <div className='userDashboard' >
      <div className='userDashboard-header'>
        <h1>Hello, {name}!</h1>
        <p>"The future depends on what you do today" - Gandhi</p>
      </div>
      <div className='userDashboard-body'>
        <HomepageMyWork tasks={tasks}/>
        <HomepageImportantUpdates/>
        <HomepageMyProjects projects={projects} state={state} />
      </div>
      <div className='userDashboard-footer'>
        <HomepageCharts projectsManaging={projectsManaging} projectsWorkingOn={projectsWorkingOn} tasks={tasks} taskStatuses={taskStatuses} />
      </div>
    </div>
  );
};

export default UserDashboard;
