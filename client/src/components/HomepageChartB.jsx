//This is the pie chart

import React from 'react'
import {Pie} from 'react-chartjs-2';

import '../styles/HomepageCharts.scss'


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
          '#d53c3c', //red => late
          '#8976b9', //purple => to-do
          '#fbaf3c', //orange => in progress
          '#6aa84f', //green => done
        ],
        hoverBackgroundColor: [
          '#db4f4f', 
          '#9f89d6', 
          '#ffbd59',
          '#7bbf5e',
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
              text:'Task Tracker',
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
