import ProjectListItem from './ProjectListItem';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  }
}));

export default function ProjectList({ projects, state, deleteProject, updateProjectUsers }) {
  const classes = useStyles();
  const parsedProjectList = projects.map((project) => {
    return <ProjectListItem key={project.id} project={project} state={state} deleteProject={deleteProject} updateProjectUsers={updateProjectUsers} />;
  });

  return <List className={classes.list}>{parsedProjectList}</List>;
}
