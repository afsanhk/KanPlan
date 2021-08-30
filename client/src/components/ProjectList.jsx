import ProjectListItem from "./ProjectListItem"
import List from '@material-ui/core/List';

export default function ProjectList ({projects}) {
  
  const parsedProjectList = projects.map(el => {
    return (
    <ProjectListItem 
    />)
  })
  
  return (
    <List>
      {parsedProjectList}
    </List>
  )
}