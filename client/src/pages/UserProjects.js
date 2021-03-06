import ProjectList from '../components/ProjectList';
import { getProjectsForUser } from '../helpers/selectors';
import AddProjectButton from '../components/AddProjectButton';
import '../styles/UserProjects.scss';

const UserProjects = ({ state, userID, deleteProject, addProject, updateProjectUsers }) => {
  const userProjects = !(Object.keys(state.users).length === 0) && getProjectsForUser(state, userID).map((el) => state.projects[el]);

  return (
    <div className="user-projects">
      <div className="user-projects-header">
        <h1>All Projects</h1>
        <AddProjectButton state={state} userID={userID} addProject={addProject} />
      </div>
      {userProjects && <ProjectList state={state} projects={userProjects} deleteProject={deleteProject} updateProjectUsers={updateProjectUsers} />}
    </div>
  );
};

export default UserProjects;
