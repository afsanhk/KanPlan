import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import DashboardIcon from '@material-ui/icons/Dashboard'; // Project Overview
import AssessmentIcon from '@material-ui/icons/Assessment'; // Project Gantt
import PeopleIcon from '@material-ui/icons/People';
import { makeStyles } from '@material-ui/core/styles'; //use this to customize the style
import Icon from '@material-ui/core/Icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrello } from '@fortawesome/free-brands-svg-icons'
// import { faTrello } from '@fortawesome/free-solid-svg-icons'

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

export default function LinkIconContainer ({projectID}) {

  const classes = useStyles();
  
  return (
    <div className='nav-icons'>
      <NavLink to={`/project/${projectID}/overview`} className="iconNavLink">
        <Button size="small" className={classes.button} onClick={()=>console.log("Link to user dashboard!")}>
          <DashboardIcon></DashboardIcon>
          <p>Overview</p>
        </Button>
      </NavLink>
      <NavLink to={`/project/${projectID}/gantt`} className="iconNavLink">
        <Button size="small" className={classes.button} onClick={()=>console.log("Link to project gantt!")}>
          <AssessmentIcon className='Gantt-icon'/>
          <p>Gantt</p>
        </Button>
      </NavLink>
      <NavLink to={`/project/${projectID}/kanban`} className="iconNavLink">
        <Button size="small" className={classes.button} onClick={()=>console.log("Link to project kanban!")}>
        <FontAwesomeIcon icon={faTrello} className='Kanban-icon' />
          <p>Kanban</p>
        </Button>
      </NavLink>
      <Button size="small" className={classes.button} onClick={()=>console.log("Pop up users modal!")}>
        <PeopleIcon />
        <p>Users</p>
      </Button>
    </div>
  )
}