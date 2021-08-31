import ProjectList from "../components/ProjectList";
import { getProjectsForUser } from "../helpers/selectors";

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

import './UserProjects.scss'

const useStyles = makeStyles({
  newProjectButton: {
    backgroundColor: '#3d6bb3',
    color: '#fcfcfc',
    '&:hover': {
      backgroundColor: '#1e88e5',
    }
  }
}) 

const UserProjects = ({ state, userID }) => {

  const classes = useStyles();

  const userProjects =
    !(Object.keys(state.users).length === 0) && getProjectsForUser(state, userID).map((el) => state.projects[el]);

  return (
    <div className='user-projects'>
      <div className='user-projects-header'>
        <h1>All Projects</h1>
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          className={classes.newProjectButton}
        >New Project</Button>
      </div>
      {userProjects && <ProjectList state={state} projects={userProjects} />}
    </div>
  );
};

export default UserProjects;
