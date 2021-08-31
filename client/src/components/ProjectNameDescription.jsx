import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { makeStyles } from '@material-ui/core/styles'; //use this to customize the style

import './ProjectNameDescription.scss'


const useStyles = makeStyles({
  projectAvatar: {
    'background-color': '#1e88e5',
    'font-size': '15px',
    width: '30px',
    height: '30px',
  }
}) 

export default function ProjectNameDescription({ proj_name, proj_description, team_members, state }) {
  const classes = useStyles();

  const parsedUsers = team_members.map(user => {
    const userDetails = state.users[user]
    return (
      <Avatar alt={userDetails.user_name} className={classes.projectAvatar}>
        {userDetails.user_name[0]}
      </Avatar>
    )
  })

  return (
      <article className='project-name-description'>
        <h3>{proj_name}</h3>
        <p>{proj_description}</p>
        {team_members && 
          <div className='project-grouped-users'>
            <AvatarGroup max={4}>
              {parsedUsers}
            </AvatarGroup>
          </div>
        }
      </article>
  )
}