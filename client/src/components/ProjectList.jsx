import ProjectListItem from "./ProjectListItem"
import List from '@material-ui/core/List';

export default function ProjectList ({projects}) {
  
  const parsedProjectList = projects.map(project => {
    return (
    <ProjectListItem 
      key = {project.id}
      id = {project.id}
      name = {project.proj_name}
      description = {project.proj_description}
      team_members = {project.team_members}
    />)
  })
  
  return (
    <List>
      {parsedProjectList}
    </List>
  )
}