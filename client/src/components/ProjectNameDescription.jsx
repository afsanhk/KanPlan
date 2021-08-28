import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

import './ProjectNameDescription.scss'

const theme = createTheme({
  overrides: {
    // Style sheet name ⚛️
    MuiAvatar: {
      root: {
        width: '30px',
        height: '30px',
        'font-size': '15px',
      } 
    },
  },
});


export default function ProjectNameDescription(props) {

  const { proj_name, proj_description, proj_users } = props;

  const parsedUsers = proj_users.map(user => {
    return (
      <Avatar alt={user.name} >
        {user.name[0]}
      </Avatar>
    )
  })

  return (
    <ThemeProvider theme={theme}>
      <article className='project-name-description'>
        <h3>{proj_name}</h3>
        <p>{proj_description}</p>
        {proj_users && 
          <div class='project-grouped-users'>
            <AvatarGroup max={4}>
              {parsedUsers}
            </AvatarGroup>
          </div>
        }
      </article>
    </ThemeProvider>
  )
}