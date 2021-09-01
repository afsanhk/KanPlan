//
import { useParams } from "react-router-dom";
// Components
import ProjectOverviewTable from "../components/ProjectOverviewTable";
import LinkIconContainer from "../components/LinkIconContainer";

// Helpers
import { getTasksForProject, getUsersForProject } from "../helpers/selectors";

import "../styles/ProjectOverview.scss";

const ProjectOverview = ({ state, deleteTask }) => {
  let { projectID } = useParams();

  const projectTasks = getTasksForProject(state, projectID).map((i) => state.tasks[i]);
  const projectUsers = getUsersForProject(state, projectID)
  const projectTitle = state.projects[projectID].proj_name;
  const projectDescription = state.projects[projectID].proj_description;

  return (
    <div className="project-overview">
      <div className="project-overview-header">
        <div className="project-overview-title">
          <h1>{projectTitle}</h1>
          <LinkIconContainer projectID={projectID} />
        </div>
        <p>{projectDescription}</p>
      </div>
      <div className='project-overview-body'>
        <ProjectOverviewTable state={state} projectTasks={projectTasks} projectUsers={projectUsers} deleteTask={deleteTask} className='project-overview-table' />
      </div>
    </div>
  );
};

export default ProjectOverview;
