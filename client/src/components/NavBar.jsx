import React from 'react';

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

function NavBar() {
  return (
    <ThemeProvider theme={theme}>
      <Drawer variant="permanent" anchor="left">
        <div className="nav-top">
          <img src={KanPlanLogo} alt="logo" width="100" height="100" />
          <div className="nav-body">
            <List>
              <ListItem button>
                <ListItemText primary={<HomeIcon fontSize="large" />} secondary="Home" alignItems="center" />
              </ListItem>
              <ListItem button>
                <ListItemText primary={<AppsIcon fontSize="large" />} secondary="Projects" alignItems="center" />
              </ListItem>
            </List>
          </div>
        </div>
        <div className="nav-bottom">
          <List className="nav-bottom-list">
            <ListItem button>
              <ListItemText primary={<AlarmIcon fontSize="large" />} secondary="Pomodoro" alignItems="center" />
            </ListItem>
          </List>
          <Avatar alt="" src="" className="nav-avatar" />
        </div>
      </Drawer>
    </ThemeProvider>
  );
}

export default NavBar;
