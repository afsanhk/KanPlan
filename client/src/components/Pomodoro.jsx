import React, { useState, useEffect } from 'react'

import '../styles/Pomodoro.scss'

//Material UI
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import Slider from '@material-ui/core/Slider';

function Pomodoro({ onTimerStart, onTimerPause, onTimerReset }) {


  const [workInterval, setWorkInterval] = useState(60) //1500 seconds = 25 mins
  const [shortBreak, setShortBreak] = useState(60) //300 seconds = 5 mins
  const [clickButton, setClickButton] = useState(false)

  // slider labels
  const marks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 30,
      label: '30'
    },
    {
      value: 60,
      label: '60',
    },
  ];



  const handleWorkSliderChange = (event, val) => {
    setWorkInterval(() => val * 60)
  }
  
  const handleSBreakSliderChange = (event, val) => {
    setShortBreak(val * 60)
  }

  const clickPlay = function () {
    setClickButton(true)
    onTimerStart(workInterval, shortBreak)
  }

  const clickPause = function () {
    setClickButton(false)
    onTimerPause()
  }


  return (
    <div className='pomodoro'>
      <div className='buttons'>
        {!clickButton ? (
          <IconButton size="small">  
            <PlayCircleOutlineIcon onClick={clickPlay}/>
          </IconButton>
        ) : (
          <IconButton size="small">  
            <PauseCircleOutlineIcon onClick={clickPause}/>
          </IconButton>
        )
        }
        <Button size="small" onClick={onTimerReset}>RESET</Button>
      </div>
      <div className='sliders'>
        <p>Work Interval</p>
        <Slider 
          defaultValue={25}
          step={1}
          marks={marks}
          valueLabelDisplay="auto"
          max={60}
          onChange={ handleWorkSliderChange }  
        />
      </div>
      <div className='sliders'>
        <p>Short Break</p>
        <Slider 
          defaultValue={5}
          step={1}
          marks={marks}
          valueLabelDisplay="auto"
          max={60}
          onChange={ handleSBreakSliderChange }  
        />
      </div>
    </div>
  )
}

export default Pomodoro
