import React, { useState, useEffect } from 'react'

import '../styles/Pomodoro.scss'

//Material UI
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import Slider from '@material-ui/core/Slider';

function Pomodoro() {
  // const [minutes, setMinutes] = useState(1);
  // const [seconds, setSeconds] = useState(0);
  // const [showShortBreakMsg, setShowShortBreakMsg] = useState(false)

  // const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  // const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  const [workInterval, setWorkInterval] = useState(25)
  const [shortBreak, setShortBreak] = useState(5)
  const [longBreak, setLongBreak] = useState(15)

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
    setWorkInterval(val)
  }
  
  const handleSBreakSliderChange = (event, val) => {
    setShortBreak(val)
  }

  const handleLBreakSliderChange = (event, val) => {
    setLongBreak(val)
  }


  return (
    <div className='pomodoro'>
      <div className='buttons'>
        <IconButton size="small">  
          <PlayCircleOutlineIcon onClick={() => console.log('workInterval', workInterval)}/>
        </IconButton>
        <Button size="small">RESET</Button>
      </div>
      <div className='sliders'>
        <p>Work Interval</p>
        <Slider 
          defaultValue={25}
          step={2}
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
          step={2}
          marks={marks}
          valueLabelDisplay="auto"
          max={60}
          onChange={ handleSBreakSliderChange }  
        />
      </div>
      <div className='sliders'>
        <p>Long Break</p>
        <Slider 
          defaultValue={15}
          step={2}
          marks={marks}
          valueLabelDisplay="auto"
          max={60}
          onChange={ handleLBreakSliderChange }  
        />
      </div>
      <div className='interval-counter'>
        1/4
      </div>
    </div>
  )
}

export default Pomodoro
