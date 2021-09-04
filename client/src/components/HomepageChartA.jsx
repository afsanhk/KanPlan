//This is the donut chart

import React, {useState, useEffect} from 'react'
import {Doughnut} from 'react-chartjs-2';

import '../styles/HomepageCharts.scss'




function HomepageChartA({ chartInformation, chartTitle, chartColor, data }) {

  console.log('chartInformation:', chartInformation)
  console.log('data:', data)


  const [isRebuildingCanvas, setIsRebuildingCanvas] = useState(false);

  // remove the canvas whenever chartInformation changes
  useEffect(() => {
    setIsRebuildingCanvas(true);
  }, [chartInformation]);

  /* if isRebuildingCanvas was true for the latest render, 
  it means the canvas element was just removed from the dom. 
  set it back to false to immediately re-create a new canvas */
  useEffect(() => {
    if (isRebuildingCanvas) {
      setIsRebuildingCanvas(false);
    }
  }, [isRebuildingCanvas]);

  
  const plugins = [{
    beforeDraw: function(chart) {
      const width = chart.width,
      height = chart.height,
      ctx = chart.ctx;
      ctx.restore();
      const fontSize = (height / 70).toFixed(2);
      ctx.font = fontSize + "em sans-serif";
      ctx.fillStyle = chartColor[0]; //changes the colour of the middle text
      ctx.textBaseline = "top";
      let text = chartInformation, //pass in props here too
      textX = Math.round((width - ctx.measureText(text).width) / 2),
      textY = height / 2;
      ctx.fillText(text, textX, textY);
      ctx.save();
    } 
  }]

  const chartData = {
    datasets: [
      {
        backgroundColor: chartColor, //change color of the ring (donut) - data needs to come in an array
        hoverBackgroundColor: chartColor, //same value as backgroundColor - data needs to come in an array
        data: data, //always keep this >0, so the donut will show - data needs to come in an array
        borderWidth: 0,
        cutout: '90%'
      }
    ]
  }
  
  
  return (
    <div className='canvas-container-chartA'>
      {isRebuildingCanvas ? undefined : (
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
      />)}
    </div>
  )
}

export default HomepageChartA
