import React from "react";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Badge from '@material-ui/core/Badge';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import ListAltIcon from '@material-ui/icons/ListAlt';
import EventBusyIcon from '@material-ui/icons/EventBusy';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';

import { makeStyles } from '@material-ui/core/styles'; //use this to customize the style

import "../styles/HomepageImportantUpdates.scss"

const useStyles = makeStyles({
  listItem: {
    height: '42px',
  },
  listItemIcon: {
    margin: '0 15px',
    color: '#757575'
  },
  darkerDivider: {
    height: '1px',
    backgroundColor: '#757575'
  }
})

const randomBadgeNumber = function () { //limit to max 10
  return Math.floor(Math.random() * 10);
}

export default function HomepageImportantUpdates({taskStatuses}) {

  const classes = useStyles();

  return (
    <div className='homepage-important-updates'>
      <h2><strong>Important Updates</strong></h2>
  
      <div className='homepage-assigned-title'>
          <StarBorderIcon />
          <h3>Assigned To Me</h3>
      </div>
      
      <List>
        <Divider className={classes.darkerDivider}/>
        <ListItem button className={classes.listItem}>
          <ListAltIcon className={classes.listItemIcon}/>
          <ListItemText primary="New Tasks" />
          <Badge badgeContent={randomBadgeNumber()} color="primary" />
        </ListItem>
        <Divider lighter='true' />
        <ListItem button className={classes.listItem}>
          <EventBusyIcon className={classes.listItemIcon}/>
          <ListItemText primary="Late Tasks" />
          <Badge badgeContent={taskStatuses.late} color="primary" />
        </ListItem>
        <Divider />
        <ListItem button className={classes.listItem}>
          <AssignmentOutlinedIcon className={classes.listItemIcon}/>
          <ListItemText primary="New Projects" />
          <Badge badgeContent={randomBadgeNumber()} color="primary" />
        </ListItem>
      </List>

  
      <div className='homepage-assigned-title'>
          <AlternateEmailIcon />
          <h3>Messages and Mentions</h3>
      </div>
      
      <List>
        <Divider className={classes.darkerDivider}/>
        <ListItem button className={classes.listItem}>
          <MessageOutlinedIcon className={classes.listItemIcon}/>
          <ListItemText primary="Private Messages" />
          <Badge badgeContent={randomBadgeNumber()} color="primary" />
        </ListItem>
        <Divider lighter='true' />
        <ListItem button className={classes.listItem}>
          <ForumOutlinedIcon className={classes.listItemIcon}/>
          <ListItemText primary="Team Messages" />
          <Badge badgeContent={randomBadgeNumber()} color="primary" />
        </ListItem>
        <Divider />
        <ListItem button className={classes.listItem}>
          <LocalOfferOutlinedIcon className={classes.listItemIcon}/>
          <ListItemText primary="Mentions" />
          <Badge badgeContent={randomBadgeNumber()} color="primary" />
        </ListItem>
      </List>

    </div>
  )

}
