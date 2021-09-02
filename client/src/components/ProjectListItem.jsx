import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

import '../styles/ProjectListItem.scss'

import LinkIconContainer from './LinkIconContainer';
import LinearWithValueLabel from './ProjectStatusBar';

// id is project id
export default function ProjectListItem ({id, name, description, team_members, state}) {

  const parsedUsers = team_members.map(user => {
    const userDetails = state.users[user]
    return (
      <Avatar alt={userDetails.user_name} >
        {userDetails.user_name[0]}
      </Avatar>
    )
  })
  
  return (
    <article className="project">
      <header className="project-header">
        <h2>{name}</h2>
        <LinearWithValueLabel  state={state} projectID={id}/>
      </header>
      <p className="project-body">{description}</p>
      <footer className="project-footer">
        <div className="nav-icon-container">
          <LinkIconContainer projectID={id} text/>
        </div>
          {team_members && 
            <div class='project-grouped-users'>
              <AvatarGroup max={4}>
                {parsedUsers}
              </AvatarGroup>
            </div>
          }
      </footer>
    </article>
  )
}