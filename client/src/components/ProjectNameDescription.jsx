import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

import '../styles/ProjectNameDescription.scss'

export default function ProjectNameDescription({ proj_name, proj_description, team_members, state }) {

  const parsedUsers = team_members.map(user => {
    const userDetails = state.users[user]
    return (
      <Avatar alt={userDetails.user_name}>
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