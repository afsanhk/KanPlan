import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import KanPlanLogo from '../images/KanPlanLogo.jpg';
import './NavBar.scss';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import AppsIcon from '@material-ui/icons/Apps';
import AlarmIcon from '@material-ui/icons/Alarm';
import Avatar from '@material-ui/core/Avatar';

import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

const theme = createTheme({
  overrides: {
    MuiDrawer: {
      paper: {
        'justify-content': 'space-between'
      }
    },
    MuiListItem: {
      root: {
        'text-align': 'center'
      }
    },
    MuiButtonBase: {
      root: {
        'margin-top': '10px'
      }
    },
    MuiAvatar: {
      root: {
        width: '75px',
        height: '75px',
        margin: '10px 0 20px 0'
      }
    }
  }
});

const useStyles = makeStyles({
  selected: {
    backgroundColor: '#f5f5f5',
  }
})

function NavBar() {

  const { pathname } = useLocation();  //extracts pathname from current url location
  const classes = useStyles();

  const activePage = function () {
    if (['/'].includes(pathname)) {
      return 'homepage'
    }

    if (['/projects'].includes(pathname)) {
      return 'projects'
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Drawer variant="permanent" anchor="left">
        <div className="nav-top">
          <img src={KanPlanLogo} alt="logo" width="100" height="100" />
          <div className="nav-body">
            <List>
              <NavLink to='/' className='navlink'>
                <ListItem button className={activePage() === 'homepage' ? classes.selected : ''}>
                  <ListItemText primary={<HomeIcon fontSize="large" />} secondary="Home" alignItems="center" />
                </ListItem>
              </NavLink>
              <NavLink to='/projects' className='navlink'>
                <ListItem button className={activePage() === 'projects' ? classes.selected : ''} >
                  <ListItemText primary={<AppsIcon fontSize="large" />} secondary="Projects" alignItems="center" />
                </ListItem>
              </NavLink>
              <NavLink to='/project/gantt' className='navLink'> 
                <li>Gantt Placeholder</li>
              </NavLink>
            </List>
          </div>
        </div>
        <div className="nav-bottom">
          <List className="nav-bottom-list">
            <ListItem button >
              <ListItemText primary={<AlarmIcon fontSize="large" className={'pomodoro-icon'} />} secondary="Pomodoro" alignItems="center" />
            </ListItem>
          </List>
          <Avatar alt="" src="" className="nav-avatar" />
        </div>
      </Drawer>
    </ThemeProvider>
  );
}

export default NavBar;
