import React from 'react'
import UpcomingTaskList from './UpcomingTaskList'

import '../styles/ProjectOverviewUpcomingTasks.scss'

function ProjectOverviewUpcomingTasks({projectTasks, userID}) {


  return (
    <div className='upcoming-tasks'>
      <h2>Upcoming Deadlines</h2>
      <UpcomingTaskList projectTasks={projectTasks} userID={userID} />
    </div>
  )
}

export default ProjectOverviewUpcomingTasks
