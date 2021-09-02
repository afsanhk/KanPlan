import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import KanPlanLogo from '../images/KanPlanLogo.jpg';
import '../styles/NavBar.scss';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
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
        'justify-content': 'space-between',
        width: '120px',
      }
    }
  }
});

const useStyles = makeStyles({
  selected: {
    backgroundColor: '#f5f5f5'
  },
  navBarButton: {
    'text-align': 'center',
    'margin-top': '10px',
    color: '#545454'
  },
  navBarIcon: {
    fontSize: '45px',
  },
  navBarAvatar: 
  {
    border: 'solid #545454 4px',
    width: '80px',
    height: '80px',
    margin :'10px 0 20px 0',
  }
});

function NavBar() {
  const { pathname } = useLocation(); //extracts pathname from current url location
  const classes = useStyles();

  const activePage = function () {
    if (['/'].includes(pathname)) {
      return 'homepage';
    }

    if (['/projects'].includes(pathname)) {
      return 'projects';
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Drawer variant="permanent" anchor="left" className='navBar'>
        <div className="nav-top">
          <img src={KanPlanLogo} alt="logo" width="100" height="100" />
          <div className="nav-body">
            <List>
              <NavLink to="/" className="navlink">
                <ListItem button className={[activePage() === 'homepage' ? classes.selected : '', classes.navBarButton] } alignItems="center">
                  <ListItemText 
                    primary={<HomeIcon className={classes.navBarIcon} />} 
                    secondary={<Typography>Home</Typography>}  
                  />
                </ListItem>
              </NavLink>
              <NavLink to="/projects" className="navlink">
                <ListItem button className={[activePage() === 'projects' ? classes.selected : '', classes.navBarButton] }>
                  <ListItemText 
                    primary={<AppsIcon className={classes.navBarIcon} />} 
                    secondary={<Typography>Projects</Typography>}
                  />
                </ListItem>
              </NavLink>
              <NavLink to="/project/1/overview">
                <ListItem>
                    <ListItemText className={classes.navBarButton}>
                    Project Overview
                    </ListItemText>
                  </ListItem>
              </NavLink>
              <NavLink to="/project/1/gantt">
                <ListItem>
                  <ListItemText className={classes.navBarButton}>
                    Gantt Placeholder
                  </ListItemText>
                </ListItem>
              </NavLink>
              <NavLink to="/project/1/kanban">
                <ListItem>
                    <ListItemText className={classes.navBarButton}>
                    Kanban Placeholder
                    </ListItemText>
                  </ListItem>
              </NavLink>
            </List>
          </div>
        </div>
        <div className="nav-bottom">
          <List className="nav-bottom-list">
            <ListItem button className={ classes.navBarButton  }>
              <ListItemText 
                primary={<AlarmIcon fontSize="large" className={ classes.navBarIcon } />} 
                secondary={<Typography>Pomodoro</Typography>}
              />
            </ListItem>
          </List>
          <Avatar alt="" src="" className={classes.navBarAvatar} />
        </div>
      </Drawer>
    </ThemeProvider>
  );
}

export default NavBar;
