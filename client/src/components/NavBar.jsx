import React, { useContext, useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import KanPlanLogo from '../images/KanPlanLogo.png';
import '../styles/NavBar.scss';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import AppsIcon from '@material-ui/icons/Apps';
import AlarmIcon from '@material-ui/icons/Alarm';
import ForumIcon from '@material-ui/icons/Forum';
import { Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';

import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

import { authContext } from '../providers/AuthProvider';
import { imageContext } from '../providers/ImagePorvider';

//helpers
import avatarBGColor from '../helpers/avatarBG';
import Pomodoro from './Pomodoro';
import FaceDetection from './FaceDetection';

const theme = createTheme({
  overrides: {
    MuiDrawer: {
      paper: {
        'justify-content': 'space-between',
        width: '120px'
      }
    }
  }
});

const useStyles = makeStyles({
  selected: {
    backgroundColor: 'rgba(189, 189, 189, 0.3)'
  },
  navBarButton: {
    'text-align': 'center',
    'margin-top': '10px',
    color: '#545454'
  },
  navBarIcon: {
    fontSize: '45px'
  },
  navBarAvatar: {
    border: 'solid #757575 3px',
    width: '80px',
    height: '80px',
    marginBottom: '20px'
  }
});

function NavBar({ userID }) {
  const { pathname } = useLocation(); //extracts pathname from current url location
  const { logout } = useContext(authContext);
  const { imageSrc } = useContext(imageContext);
  const classes = useStyles();

  const [showFaceDetect, setShowFaceDetect] = useState(false);

  const handleShowFaceDetect = () => {
    setShowFaceDetect(!showFaceDetect);
  };

  //to highlight the page user is currently on
  const activePage = function () {
    if (showPomodoro === true) {
      return 'pomodoro';
    }

    if (['/'].includes(pathname)) {
      return 'homepage';
    }

    if (['/projects'].includes(pathname)) {
      return 'projects';
    }
  };

  //pomodoro logic
  const [showPomodoro, setShowPomodoro] = useState(false);
  const [pomodoroTimer, showPomodoroTimer] = useState(false)
  const [timer, setTimer] = useState()
  const [secondsLeft, setSecondsLeft] = useState(0); //1500 seconds = 25 mins
  const [pauseSeconds, setPauseSeconds] = useState(0); //value saved if the user pauses
  const [buttonMode, setButtonMode] = useState('stop') // 'pause', 'start', 'stop' - to ensure the correct button (pause or start) is showing in the Pomodoro

  const [shortBreak, setShortBreak] = useState(0)
  const [pomodoroMode, setPomodoroMode] = useState('Work interval')

  const handleShowPomodoro = () => {
    setShowPomodoro(!showPomodoro)
  }

  //turn seconds into human readable format
  const countdown = function (secondsLeft) {
    let timerMinutes = Math.floor(secondsLeft / 60);
    let timerSeconds = (secondsLeft % 60);

    if (timerSeconds < 10) {
      timerSeconds = `0${timerSeconds}`
    }

    return `${timerMinutes}:${timerSeconds}`
  }


  const onTimerStart = (workInterval, shortBreak) => {
    showPomodoroTimer(true)
    setButtonMode('start')

    if (pauseSeconds === 0) {
      setSecondsLeft(workInterval)
      setShortBreak(shortBreak)
    } else {
      setSecondsLeft(pauseSeconds)
    }

    const minusOneSecond = setInterval(() => {
        setSecondsLeft((secondsLeft) => secondsLeft - 1);
        if (secondsLeft === 0) {
          clearInterval(timer);
        }
    }, 100);

    //makes sure that we can reference the setInterval later, to clear or pause it
    setTimer(minusOneSecond)
  }

  const onTimerPause = () => {
    setPauseSeconds(secondsLeft)
    clearInterval(timer)
    setButtonMode('pause')
  }
  
  const onTimerReset = () => {
    setSecondsLeft(0)
    setShortBreak(0)
    setPauseSeconds(0)
    setShortBreak(0)
    setPomodoroMode('Work Interval')
    setButtonMode('stop')
  }
  
  useEffect(() => {
    if (secondsLeft === 0 && shortBreak !== 0) {
      handleShowSnackbar()
      setPomodoroMode('Break Time!')
      setSecondsLeft(shortBreak)
      setShortBreak(0)

    } else if (secondsLeft === 0) {
      setButtonMode('stop')
      showPomodoroTimer(false)
      setPomodoroMode('Work Interval')
      
    } else if (secondsLeft === -1) {
      clearInterval(timer);
      
    }   
  }, [secondsLeft, timer]);
    

  useEffect(() => {
    return () => {
      clearInterval(timer);
    }
  }, [timer]);


  //snackbar logic
  const [showSnackbar, setShowSnackbar] = useState(false)

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleShowSnackbar = function () {
    setShowSnackbar(true)
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowSnackbar(false);
  };


  let avatarBG = avatarBGColor(userID);

  return (
    <ThemeProvider theme={theme}>
      <Drawer variant="permanent" anchor="left" className="navBar">
        <div className="nav-top">
          <img src={KanPlanLogo} alt="logo" width="100" height="100" />
          <div className="nav-body">
            <List>
              <NavLink to="/" className="navlink">
                <ListItem button className={[activePage() === 'homepage' ? classes.selected : '', classes.navBarButton]} alignItems="center">
                  <ListItemText primary={<HomeIcon className={classes.navBarIcon} />} secondary={<Typography>Home</Typography>} />
                </ListItem>
              </NavLink>
              <NavLink to="/projects" className="navlink">
                <ListItem button className={[activePage() === 'projects' ? classes.selected : '', classes.navBarButton]}>
                  <ListItemText primary={<AppsIcon className={classes.navBarIcon} />} secondary={<Typography>Projects</Typography>} />
                </ListItem>
              </NavLink>
              <NavLink to="/chat" className="navlink">
                <ListItem button className={classes.navBarButton}>
                  <ListItemText 
                    primary={<ForumIcon className={classes.navBarIcon} />} 
                    secondary={<Typography>Chat</Typography>}
                  />
                </ListItem>
              </NavLink>
            </List>
          </div>
        </div>
        <div className="nav-bottom">
          <List className="nav-bottom-list">
            {pomodoroTimer && 
              <div className='pomodoro-list-item'>
                <p className='pomodoro-mode'>{pomodoroMode}</p>
                <p className='pomodoro-countdown'>{countdown(secondsLeft)}</p>
              </div>
            }
            <ListItem button className={[activePage() === 'pomodoro' ? classes.selected : '', classes.navBarButton]}>
              <ListItemText primary={<AlarmIcon fontSize="large" className={classes.navBarIcon} />} secondary={<Typography>Pomodoro</Typography>} onClick={handleShowPomodoro}/>
            </ListItem>
          </List>
          <Avatar alt="" className={classes.navBarAvatar} src={imageSrc ? imageSrc : `https://robohash.org/${userID}`} style={{ 'background-color': avatarBG }} onClick={handleShowFaceDetect} />
          <Button onClick={() => logout()}>Logout</Button>
        </div>
      </Drawer>
      {showPomodoro && <Pomodoro onTimerStart={onTimerStart} onTimerPause={onTimerPause} onTimerReset={onTimerReset} secondsLeft={secondsLeft} buttonMode={buttonMode} showPomodoroTime={showPomodoroTimer}/>}
      {showFaceDetect && <FaceDetection userID={userID} show={showFaceDetect} />}

      <Snackbar 
        open={showSnackbar} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
      >
          <Alert onClose={handleCloseSnackbar} severity="success">
            Time for a quick break!
          </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default NavBar;
