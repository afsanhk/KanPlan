//This is the pie chart

import React from 'react'
import {Doughnut} from 'react-chartjs-2';

import './HomepageCharts.scss'




function HomepageChartA(props) {
  
  const { chartInformation, chartTitle, chartColor } = props;
  
  const plugins = [{
    beforeDraw: function(chart) {
      const width = chart.width,
      height = chart.height,
      ctx = chart.ctx;
      ctx.restore();
      const fontSize = (height / 70).toFixed(2);
      ctx.font = fontSize + "em sans-serif";
      ctx.fillStyle = chartColor; //changes the colour of the middle text
      ctx.textBaseline = "top";
      const text = chartInformation, //pass in props here too
      textX = Math.round((width - ctx.measureText(text).width) / 2),
      textY = height / 2;
      ctx.fillText(text, textX, textY);
      ctx.save();
    } 
  }]

  const chartData = {
    datasets: [
      {
        backgroundColor: [
          chartColor, //change color of the ring (donut) 
        ],
        hoverBackgroundColor: [
          chartColor //same value as backgroundColor
        ],
        data: [chartInformation], //need to pass in props!
        borderWidth: 0,
        cutout: '90%'
      }
    ]
  }
  return (
    <div className='canvas-container-chartA'>
      <Doughnut
        data={chartData}
        spacing={30}
        options={{
          plugins: {
            title:{
              display:true,
              text: chartTitle, //pass in chart title here
              font: {
                size: 22
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
