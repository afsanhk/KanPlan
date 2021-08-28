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

import "./HomepageImportantUpdates.scss"

const useStyles = makeStyles({
  listItemIcon: {
    margin: '0 15px',
  },
  darkerDivider: {
    height: '2px',
    backgroundColor: '#757575'
  }
  
})

export default function HomepageImportantUpdates(props) {

  const classes = useStyles();

  return (
    <div>
      <h2><strong>Important Updates</strong></h2>
  
      <div className='homepage-assigned-title'>
          <StarBorderIcon />
          <h3>Assigned To Me</h3>
      </div>
      
      <List dense>
        <Divider className={classes.darkerDivider}/>
        <ListItem button>
          <ListAltIcon className={classes.listItemIcon}/>
          <ListItemText primary="New Tasks" />
          <Badge badgeContent={4} color="primary" />
        </ListItem>
        <Divider lighter='true' />
        <ListItem button>
          <EventBusyIcon className={classes.listItemIcon}/>
          <ListItemText primary="Late Tasks" />
          <Badge badgeContent={2} color="primary" />
        </ListItem>
        <Divider />
        <ListItem button>
          <AssignmentOutlinedIcon className={classes.listItemIcon}/>
          <ListItemText primary="New Projects" />
          <Badge badgeContent={1} color="primary" />
        </ListItem>
        <Divider />
      </List>

      <br />
  
      <div className='homepage-assigned-title'>
          <AlternateEmailIcon />
          <h3>Messages and Mentions</h3>
      </div>
      
      <List dense>
        <Divider className={classes.darkerDivider}/>
        <ListItem button>
          <MessageOutlinedIcon className={classes.listItemIcon}/>
          <ListItemText primary="Private Messages" />
          <Badge badgeContent={7} color="primary" />
        </ListItem>
        <Divider lighter='true' />
        <ListItem button>
          <ForumOutlinedIcon className={classes.listItemIcon}/>
          <ListItemText primary="Team Messages" />
          <Badge badgeContent={3} color="primary" />
        </ListItem>
        <Divider />
        <ListItem button>
          <LocalOfferOutlinedIcon className={classes.listItemIcon}/>
          <ListItemText primary="Mentions" />
          <Badge badgeContent={1} color="primary" />
        </ListItem>
        <Divider />
      </List>

    </div>
  )

}
