// Components
import ProjectOverviewTable from "../components/ProjectOverviewTable";
import LinkIconContainer from "../components/LinkIconContainer"

// Helpers
import { getTasksForProject, getUsersForProject } from "../helpers/selectors";

import '../styles/ProjectOverview.scss'

const ProjectOverview = ({ state, projectID }) => {
  const projectTasks = getTasksForProject(state, projectID).map((i) => state.tasks[i]);
  const projectUsers = getUsersForProject(state, projectID)
  const projectTitle = state.projects[projectID].proj_name;
  const projectDescription = state.projects[projectID].proj_description;

  return (
    <div className='project-overview'>
      <div className='project-overview-header'>
        <div className='project-overview-title'>
          <h1>{projectTitle}</h1>
          <LinkIconContainer />
        </div>
        <p>{projectDescription}</p>
      </div>
      <div className='project-overview-body'>
        <ProjectOverviewTable projectTasks={projectTasks} projectUsers={projectUsers} className='project-overview-table' />
      </div>
    </div>
  );
};

export default ProjectOverview;
