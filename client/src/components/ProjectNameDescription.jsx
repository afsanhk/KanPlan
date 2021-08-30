import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
// import { createTheme, ThemeProvider } from '@material-ui/core/styles';

import './ProjectNameDescription.scss'

// const theme = createTheme({
//   overrides: {
//     // Style sheet name ⚛️
//     MuiAvatar: {
//       root: {
//         width: '30px',
//         height: '30px',
//         'font-size': '15px',
//       } 
//     },
//   },
// });


export default function ProjectNameDescription({ proj_name, proj_description, team_members, state }) {

  const parsedUsers = team_members.map(user => {
    const userDetails = state.users[user]
    return (
      <Avatar alt={userDetails.user_name} >
        {userDetails.user_name[0]}
      </Avatar>
    )
  })

  return (
    // <ThemeProvider theme={theme}>
      <article className='project-name-description'>
        <h3>{proj_name}</h3>
        <p>{proj_description}</p>
        {team_members && 
          <div class='project-grouped-users'>
            <AvatarGroup max={4}>
              {parsedUsers}
            </AvatarGroup>
          </div>
        }
      </article>
    // </ThemeProvider>
  )
}