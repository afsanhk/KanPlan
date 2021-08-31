//
import { useParams } from "react-router-dom";
// Components
import ProjectOverviewTable from "../components/ProjectOverviewTable";
import LinkIconContainer from "../components/LinkIconContainer";

// Helpers
import { getTasksForProject } from "../helpers/selectors";

import "../styles/ProjectOverview.scss";

const ProjectOverview = ({ state, projectID }) => {
  // Chicken will be renamed to projectID
  let { chicken } = useParams();
  console.log(chicken);

  const projectTasks = getTasksForProject(state, chicken).map((i) => state.tasks[i]);
  const projectTitle = state.projects[chicken].proj_name;
  const projectDescription = state.projects[chicken].proj_description;

  return (
    <div className="project-overview">
      <div className="project-overview-header">
        <div className="project-overview-title">
          <h1>{projectTitle}</h1>
          <LinkIconContainer />
        </div>
        <p>{projectDescription}</p>
      </div>
      <div className="project-overview-body">
        <ProjectOverviewTable projectTasks={projectTasks} />
      </div>
    </div>
  );
};

export default ProjectOverview;
