import Gantt from "../components/Gantt";

import { getTasksForProject } from "../helpers/selectors";

const ProjectGantt = ({ state, projectID }) => {
  const projectTasks = getTasksForProject(state, projectID).map((i) => state.tasks[i]);
  return (
    <div>
      <h1>This will show the project Gantt.</h1>
      <h1>Currently showing for {state.projects[projectID].proj_name}</h1>
      <section className="ganttContainer" style={{ marginLeft: "140px" }}>
        <Gantt projectTasks={projectTasks} />
      </section>
    </div>
  );
};

export default ProjectGantt;
