import ProjectListItem from "./ProjectListItem"
import List from '@material-ui/core/List';

export default function ProjectList ({projects, state}) {
  
  const parsedProjectList = projects.map(project => {
    return (
    <ProjectListItem 
      key = {project.id}
      id = {project.id}
      name = {project.proj_name}
      description = {project.proj_description}
      team_members = {project.team_members}
      state = {state}
    />)
  })
  
  return (
    <List>
      {parsedProjectList}
    </List>
  )
}