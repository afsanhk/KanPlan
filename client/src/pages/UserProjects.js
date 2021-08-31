import ProjectList from "../components/ProjectList";
import { getProjectsForUser } from "../helpers/selectors";

const UserProjects = ({ state, userID }) => {
  const userProjects =
    !(Object.keys(state.users).length === 0) && getProjectsForUser(state, userID).map((el) => state.projects[el]);

  return (
    <div>
      <h1>This will show the user projects.</h1>
      {userProjects && <ProjectList state={state} projects={userProjects} />}
    </div>
  );
};

export default UserProjects;
