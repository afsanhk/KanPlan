//This is the pie chart

import React from 'react'
import {Pie} from 'react-chartjs-2';

import './HomepageCharts.scss'


function HomepageChartB({ chartInformation }) {

  const lateCount = chartInformation.late
  const toDoCount = chartInformation.toDo
  const inProgressCount = chartInformation.inProgress
  const doneCount = chartInformation.done


  const chartData = {
    labels: ['Late', 'To-Do', 'In Progress',
             'Done'],
    datasets: [
      {
        backgroundColor: [
          '#ff4d4d', //red => late
          '#b055c4', //purple => to-do
          '#f2b25e', //orange => in progress
          '#409255', //green => done
        ],
        hoverBackgroundColor: [
          '#ce3d4b', 
          '#9a2bb2', 
          '#e99426',
          '#14752d',
        ],
        data: [lateCount, toDoCount, inProgressCount, doneCount], //need to pass in props!
      }
    ]
  }
  return (
    <div className='canvas-container-chartB'>
      <Pie
        data={chartData}
        spacing={30}
        options={{
          plugins: {
            title:{
              display:true,
              text:'Task Tracker:',
              font: {
                size: 22
              },
            },
            legend:{
              display: false,
              position: 'right',
              labels:{
                font:{
                  size: 15
                },
                padding: 30
              },
            }
          },
          maintainAspectRatio: false,
        }}
      />
    </div>
  )
}

export default HomepageChartB
