// Components
import ProjectOverviewTable from "../components/ProjectOverviewTable";

// Helpers
import { getTasksForProject } from "../helpers/selectors";

const ProjectOverview = ({ state, projectID }) => {
  const projectTasks = getTasksForProject(state, projectID).map((i) => state.tasks[i]);
  return (
    <div>
      <h1>This will show the project overview.</h1>
      <ProjectOverviewTable projectTasks={projectTasks} />
    </div>
  );
};

export default ProjectOverview;
