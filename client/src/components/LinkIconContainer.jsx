import Button from '@material-ui/core/Button';
import DashboardIcon from '@material-ui/icons/Dashboard'; // Project Overview
import AssessmentIcon from '@material-ui/icons/Assessment'; // Project Gantt
import ListAltIcon from '@material-ui/icons/ListAlt'; // Project Kanban
import PeopleIcon from '@material-ui/icons/People';
import { makeStyles } from '@material-ui/core/styles'; //use this to customize the style

import '../styles/LinkIconContainer.scss'

export default function LinkIconContainer ({project}) {
  
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

  const classes = useStyles();
  
  return (
    <div className='nav-icons'>
      <Button size="small" className={classes.button} onClick={()=>console.log("Link to user dashboard!")}>
        <DashboardIcon />
        <p>Overview</p>
      </Button>
      <Button size="small" className={classes.button} onClick={()=>console.log("Link to project gantt!")}>
        <AssessmentIcon />
        <p>Gantt</p>
      </Button>
      <Button size="small" className={classes.button} onClick={()=>console.log("Link to project kanban!")}>
        <ListAltIcon />
        <p>Kanban</p>
      </Button>
      <Button size="small" className={classes.button} onClick={()=>console.log("Pop up users modal!")}>
        <PeopleIcon />
        <p>Users</p>
      </Button>
    </div>
  )
}