import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import DashboardIcon from '@material-ui/icons/Dashboard'; // Project Overview
import AssessmentIcon from '@material-ui/icons/Assessment'; // Project Gantt
import ListAltIcon from '@material-ui/icons/ListAlt'; // Project Kanban
import PeopleIcon from '@material-ui/icons/People';
import { makeStyles } from '@material-ui/core/styles'; //use this to customize the style
import Icon from '@material-ui/core/Icon';
import { loadCSS } from 'fg-loadcss';

import '../styles/LinkIconContainer.scss'

const useStyles = makeStyles(() => ({
  button: {
    'margin-right': '5px',
    color: '#093170',
    height: '40px',
    padding: '10px 8px',
    'text-transform': 'none',
    'font-size': '16px',
  },
}));

export default function LinkIconContainer ({project}) {
  

  React.useEffect(() => {
    const node = loadCSS(
      'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
      document.querySelector('#font-awesome-css'),
    );

    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);

  const classes = useStyles();
  
  return (
    <div className='nav-icons'>
      <Button size="small" className={classes.button} onClick={()=>console.log("Link to user dashboard!")}>
        <DashboardIcon />
        <p>Overview</p>
      </Button>
      <Button size="small" className={classes.button} onClick={()=>console.log("Link to project gantt!")}>
        <AssessmentIcon className='Gantt-icon'/>
        <p>Gantt</p>
      </Button>
      <Button size="small" className={classes.button} onClick={()=>console.log("Link to project kanban!")}>
      <Icon className="fab fa-trello" />
        <p>Kanban</p>
      </Button>
      <Button size="small" className={classes.button} onClick={()=>console.log("Pop up users modal!")}>
        <PeopleIcon />
        <p>Users</p>
      </Button>
    </div>
  )
}