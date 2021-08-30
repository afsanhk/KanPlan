import React from 'react'

import HomepageChartA from './HomepageChartA'
import HomepageChartB from './HomepageChartB'

import './HomepageCharts.scss'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import StopRoundedIcon from '@material-ui/icons/StopRounded';

import { makeStyles } from '@material-ui/core/styles'; //use this to customize the style

// const theme = createTheme({
//   overrides: {
//     // Style sheet name ⚛️
//     MuiListItem: {
//       root: {
//         'padding-top': 0,
//         'padding-bottom': 0,
//       } 
//     },
//   },
// });

const useStyles = makeStyles({
  
}) 


function HomepageCharts({ projectsManaging, projectsWorkingOn, taskStatuses, tasks }) {

  const classes = useStyles();

  return (
      <div className='homepage-charts'>
        <HomepageChartA chartInformation={ projectsManaging } chartTitle='Projects Managing:' chartColor='#0099ff' />
        <HomepageChartA chartInformation={ projectsWorkingOn } chartTitle='Projects Working On:' chartColor='#ff6699' />
        {tasks[0] && 
        <div className='homepage-chart-B-legend'>
          <HomepageChartB chartInformation={ taskStatuses } />
          <List>
            {taskStatuses.late > 0 && 
            <ListItem>
              <StopRoundedIcon className='homepage-chart-legend-late' />
              <ListItemText className ='listItem'>Late</ListItemText>
            </ListItem>
            }
            {taskStatuses.toDo > 0 && 
            <ListItem>
              <StopRoundedIcon className='homepage-chart-legend-to-do' />
              <ListItemText className ='listItem'>To-Do</ListItemText>
            </ListItem>
            }
            {taskStatuses.inProgress > 0 && 
            <ListItem>
              <StopRoundedIcon className='homepage-chart-legend-in-progress' />
              <ListItemText className ='listItem'>In Progress</ListItemText>
            </ListItem>
            }
            {taskStatuses.done > 0 && 
            <ListItem>
              <StopRoundedIcon className='homepage-chart-legend-done' />
              <ListItemText className ='listItem'>Done</ListItemText>
            </ListItem>
            }
          </List>
        </div>}
        {!tasks[0] && 
        <HomepageChartA chartInformation={0} chartTitle='Task Tracker' chartColor='#4d9900' />
        }
      </div>
  )
}

export default HomepageCharts
