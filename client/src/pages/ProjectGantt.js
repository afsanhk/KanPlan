import { useParams } from "react-router";

import SFGantt from "../components/SFGantt";
import LinkIconContainer from "../components/LinkIconContainer";

import "../styles/ProjectGantt.scss";

import { getTasksForProject } from "../helpers/selectors";

const ProjectGantt = ({ state, updateProjectUsers }) => {
  const { projectID } = useParams();
  const projectTitle = state.projects[projectID].proj_name;
  const projectDescription = state.projects[projectID].proj_description;
  const projectTasks = getTasksForProject(state, projectID).map((i) => state.tasks[i]);
  return (
    <div className="project-gantt">
      <div className="project-gantt-header">
        <div className="project-gantt-title">
          <h1>{projectTitle}</h1>
          <LinkIconContainer projectID={projectID} text state={state} updateProjectUsers={updateProjectUsers} />
        </div>
        <p>{projectDescription}</p>
      </div>
      <section className="ganttContainer">
        <SFGantt projectTasks={projectTasks} />
      </section>
    </div>
  );
};

export default ProjectGantt;
