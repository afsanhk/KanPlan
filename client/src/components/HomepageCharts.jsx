import React from 'react'

import HomepageChartA from './HomepageChartA'
import HomepageChartB from './HomepageChartB'

import './HomepageCharts.scss'

import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import StopRoundedIcon from '@material-ui/icons/StopRounded';

const theme = createTheme({
  overrides: {
    // Style sheet name ⚛️
    MuiListItem: {
      root: {
        'padding-top': 0,
        'padding-bottom': 0,
      } 
    },
  },
});


function HomepageCharts({ projectsManaging, projectsWorkingOn, taskStatuses, tasks }) {

  return (
    <ThemeProvider theme={theme}>
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
              <ListItemText>Late</ListItemText>
            </ListItem>
            }
            {taskStatuses.toDo > 0 && 
            <ListItem>
              <StopRoundedIcon className='homepage-chart-legend-to-do' />
              <ListItemText>To-Do</ListItemText>
            </ListItem>
            }
            {taskStatuses.inProgress > 0 && 
            <ListItem>
              <StopRoundedIcon className='homepage-chart-legend-in-progress' />
              <ListItemText>In Progress</ListItemText>
            </ListItem>
            }
            {taskStatuses.done > 0 && 
            <ListItem>
              <StopRoundedIcon className='homepage-chart-legend-done' />
              <ListItemText>Done</ListItemText>
            </ListItem>
            }
          </List>
        </div>}
        {!tasks[0] && 
        <HomepageChartA chartInformation={0} chartTitle='Task Tracker' chartColor='#4d9900' />
        }
      </div>
    </ThemeProvider>
  )
}

export default HomepageCharts
