import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

export default function ProjectListItem ({name, description, team_members, state}) {
  
  console.log(team_members)

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
      <h3>{name}</h3>
      <p>{description}</p>
      {team_members && 
        <div class='project-grouped-users'>
          <AvatarGroup max={4}>
            {parsedUsers}
          </AvatarGroup>
        </div>
      }
    </article>
  )
}