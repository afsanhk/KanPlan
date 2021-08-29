//This is the pie chart

import React from 'react'
import {Doughnut} from 'react-chartjs-2';

import './HomepageCharts.scss'


const plugins = [{
  beforeDraw: function(chart) {
    const width = chart.width,
    height = chart.height,
    ctx = chart.ctx;
    ctx.restore();
    const fontSize = (height / 70).toFixed(2);
    ctx.font = fontSize + "em sans-serif";
    ctx.fillStyle = "rgb(79 190 255)"; //changes the colour of the middle text
    ctx.textBaseline = "top";
    const text = "3", //pass in props here too
    textX = Math.round((width - ctx.measureText(text).width) / 2),
    textY = height / 2;
    ctx.fillText(text, textX, textY);
    ctx.save();
  } 
}]


function HomepageChartA(props) {

  const chartData = {
    datasets: [
      {
        backgroundColor: [
          'rgb(79 190 255)', //change color of the ring (donut) 
        ],
        hoverBackgroundColor: [
          'rgb(79 190 255)' //same value as backgroundColor
        ],
        data: [3], //need to pass in props!
        borderWidth: 0,
        cutout: '90%'
      }
    ]
  }
  return (
    <div className='canvas-container'>
      <Doughnut
        data={chartData}
        spacing={30}
        options={{
          plugins: {
            title:{
              display:true,
              text:'Projects Managing:',
              font: {
                size: 30
              },
            },
            tooltip: {
              enabled: false,
            },
          },
          maintainAspectRatio: false,
        }}
        plugins={plugins}
      />
    </div>
  )
}

export default HomepageChartA
