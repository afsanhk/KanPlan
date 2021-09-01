import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import DashboardIcon from '@material-ui/icons/Dashboard'; // Project Overview
import AssessmentIcon from '@material-ui/icons/Assessment'; // Project Gantt
import PeopleIcon from '@material-ui/icons/People';
import { makeStyles } from '@material-ui/core/styles'; //use this to customize the style
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrello } from '@fortawesome/free-brands-svg-icons'

import '../styles/LinkIconContainer.scss'

const useStyles = makeStyles(() => ({
  buttonText: {
    color: '#093170',
    height: '40px',
    padding: '10px 8px',
    'text-transform': 'none',
    'font-size': '16px',
  },
  buttonNoText: {
    'min-width': '30px',
    color: '#093170',
  }
}));

export default function LinkIconContainer ({projectID, text}) {

  const classes = useStyles();
  
  return (
    <div className='nav-icons'>
      <NavLink to={`/project/${projectID}/overview`} className={"iconNavLink"}>
        <Button size="small" className={text ? classes.buttonText : classes.buttonNoText}>
          <DashboardIcon></DashboardIcon>
          {text && <p>Overview</p>}
        </Button>
      </NavLink>
      <NavLink to={`/project/${projectID}/gantt`} className={"iconNavLink"}>
        <Button size="small" className={text ? classes.buttonText : classes.buttonNoText}>
          <AssessmentIcon className='Gantt-icon'/>
          {text && <p>Gantt</p>}
        </Button>
      </NavLink>
      <NavLink to={`/project/${projectID}/kanban`} className={"iconNavLink"}>
        <Button size="small" className={text ? classes.buttonText : classes.buttonNoText}>
        <FontAwesomeIcon icon={faTrello} className='Kanban-icon' />
          {text && <p>Kanban</p>}
        </Button>
      </NavLink>
      {text && 
        <Button size="small" className={text ? classes.buttonText : classes.buttonNoText}>
          <PeopleIcon />
        <p>Users</p>
        </Button>
      }
    </div>
  )
}