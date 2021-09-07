import React, { useState, useEffect } from 'react';

import '../styles/Pomodoro.scss';

//Material UI
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import Slider from '@material-ui/core/Slider';

function Pomodoro({ onTimerStart, onTimerPause, onTimerReset, secondsLeft, buttonMode, showPomodoroTime }) {
  const [workInterval, setWorkInterval] = useState(1500); //1500 seconds = 25 mins
  const [shortBreak, setShortBreak] = useState(300); //300 seconds = 5 mins
  const [clickButton, setClickButton] = useState(false);

  // slider labels
  const marks = [
    {
      value: 0,
      label: '0'
    },
    {
      value: 30,
      label: '30'
    },
    {
      value: 60,
      label: '60'
    }
  ];

  const workIntervalDefaultValue = 25;

  const handleWorkSliderChange = (event, val) => {
    setWorkInterval(() => val * 60);
  };

  const handleSBreakSliderChange = (event, val) => {
    setShortBreak(val * 60);
  };

  const clickPlay = function () {
    setClickButton(true);
    onTimerStart(workInterval, shortBreak);
  };

  const clickPause = function () {
    setClickButton(false);
    onTimerPause();
  };

  const clickReset = function () {
    setClickButton(false);
    onTimerReset();
  };

  //ensures that when the timer is counting down or paused, the correct button shows even if menu is closed and reopened
  //clickButton/false = showing play
  //clickButton/true = showing pause button
  useEffect(() => {
    if (buttonMode === 'stop') {
      setClickButton(false);
    } else if (buttonMode === 'start') {
      setClickButton(true);
    } else if (buttonMode === 'pause') {
      setClickButton(false);
    }
  }, [secondsLeft]);

  return (
    <div className="pomodoro">
      <div className="pomodoro-header">
        <div className="title">
          <p>Set intervals:</p>
        </div>
        <div className="buttons">
          {!clickButton ? (
            <IconButton size="small">
              <PlayCircleOutlineIcon onClick={clickPlay} style={{ color: '#6aa84f' }} />
            </IconButton>
          ) : (
            <IconButton size="small">
              <PauseCircleOutlineIcon onClick={clickPause} style={{ color: '#757575' }} />
            </IconButton>
          )}
          <p className="button-reset" onClick={clickReset}>
            RESET
          </p>
        </div>
      </div>
      <div className="pomodoro-body">
        <div className="sliders">
          <p>Work Interval</p>
          <Slider defaultValue={25} step={0.5} marks={marks} valueLabelDisplay="auto" max={60} min={1.5} onChange={handleWorkSliderChange} />
        </div>
        <div className="sliders">
          <p>Short Break</p>
          <Slider defaultValue={5} step={0.5} marks={marks} valueLabelDisplay="auto" max={60} min={1.5} onChange={handleSBreakSliderChange} />
        </div>
      </div>
    </div>
  );
}

export default Pomodoro;
