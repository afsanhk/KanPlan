import { IconButton } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard'; // Project Overview
import AssessmentIcon from '@material-ui/icons/Assessment'; // Project Gantt
import ListAltIcon from '@material-ui/icons/ListAlt'; // Project Kanban
import PeopleIcon from '@material-ui/icons/People';
import { makeStyles } from '@material-ui/core/styles'; //use this to customize the style

export default function LinkIconContainer ({project}) {
  
  const useStyles = makeStyles(() => ({
    icon: {
      margin: '5px',
      color: 'black'
    },
  }));

  const classes = useStyles();
  
  return (
    <>
      <IconButton size="small" className={classes.icon} onClick={()=>console.log("Link to user dashboard!")}>
        <DashboardIcon />
        <p className="iconName">Overview</p>
      </IconButton>
      <IconButton size="small" className={classes.icon} onClick={()=>console.log("Link to project gantt!")}>
        <AssessmentIcon />
        <p className="iconName">Gantt</p>
      </IconButton>
      <IconButton size="small" className={classes.icon} onClick={()=>console.log("Link to project kanban!")}>
        <ListAltIcon />
        <p className="iconName">Kanban</p>
      </IconButton>
      <IconButton size="small" className={classes.icon} onClick={()=>console.log("Pop up users modal!")}>
        <PeopleIcon />
        <p className="iconName">Users</p>
      </IconButton>
    </>
  )
}