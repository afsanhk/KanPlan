import React from 'react'

import HomepageChartA from './HomepageChartA'
import HomepageChartB from './HomepageChartB'

import '../styles/HomepageCharts.scss'

import StopRoundedIcon from '@material-ui/icons/StopRounded';


function HomepageCharts({ projectsManaging, projectsWorkingOn, taskStatuses, tasks }) {

  return (
      <div className='homepage-charts'>
        {tasks[0] && 
        <div className='homepage-chart-B-legend'>
          <ul className='homepage-chart-B-legend-all'>
            {taskStatuses.late > 0 && 
            <div>
              <p>Late</p>
              <StopRoundedIcon className='homepage-chart-legend-late' />
            </div>
            }
            {taskStatuses.toDo > 0 && 
            <div>
              <p>To-Do</p>
              <StopRoundedIcon className='homepage-chart-legend-to-do' />
            </div>
            }
            {taskStatuses.inProgress > 0 && 
            <div>
              <p>In Progress</p>
              <StopRoundedIcon className='homepage-chart-legend-in-progress' />
            </div>
            }
            {taskStatuses.done > 0 && 
            <div>
              <p>Done</p>
              <StopRoundedIcon className='homepage-chart-legend-done' />
            </div>
            }
          </ul>
          <HomepageChartB chartInformation={ taskStatuses } />
        </div>}
        {!tasks[0] && 
        <HomepageChartA chartInformation={0} chartTitle='Task Tracker' chartColor={['#6aa84f', '#bdbdbd']} data={[1]}/>
        }
        <HomepageChartA chartInformation={ projectsManaging } chartTitle='Projects Managing' chartColor={['#3d6bb3']}  className='canvas-container-chartA'data={[1]}/>
        <HomepageChartA chartInformation={ projectsWorkingOn } chartTitle='Projects Working On' chartColor={['#3d6bb3']} data={[1]}/>
      </div>
  )
}

export default HomepageCharts
