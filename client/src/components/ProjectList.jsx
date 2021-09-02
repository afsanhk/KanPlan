import ProjectListItem from "./ProjectListItem"
import List from '@material-ui/core/List';

export default function ProjectList ({projects, state, deleteProject}) {
  
  const parsedProjectList = projects.map(project => {
    return (
    <ProjectListItem 
      key={project.id}
      project={project}
      state={state}
      deleteProject={deleteProject}
    />)
  })
  
  return (
    <List>
      {parsedProjectList}
    </List>
  )
}