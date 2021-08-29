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


function HomepageCharts() {
  return (
    <ThemeProvider theme={theme}>
      <div className='homepage-charts'>
        <HomepageChartA chartInformation={5} chartTitle='Projects Managing:' chartColor='#0099ff' />
        <HomepageChartA chartInformation={1} chartTitle='Projects Working On:' chartColor='#ff6699' />
        <div className='homepage-chart-B-legend'>
          <HomepageChartB chartInformation={[1,2,3,4]} />
          <List>
            <ListItem>
              <StopRoundedIcon className='homepage-chart-legend-late' />
              <ListItemText>Late</ListItemText>
            </ListItem>
            <ListItem>
              <StopRoundedIcon className='homepage-chart-legend-to-do' />
              <ListItemText>To-Do</ListItemText>
            </ListItem>
            <ListItem>
              <StopRoundedIcon className='homepage-chart-legend-in-progress' />
              <ListItemText>In Progress</ListItemText>
            </ListItem>
            <ListItem>
              <StopRoundedIcon className='homepage-chart-legend-done' />
              <ListItemText>Done</ListItemText>
            </ListItem>
          </List>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default HomepageCharts
