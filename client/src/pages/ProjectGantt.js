import { useParams } from "react-router";

import Gantt from "../components/Gantt";
import LinkIconContainer from "../components/LinkIconContainer";

import '../styles/ProjectGantt.scss'

import { getTasksForProject } from "../helpers/selectors";

const ProjectGantt = ({ state }) => {
  const { projectID } = useParams();
  const projectTitle = state.projects[projectID].proj_name;
  const projectDescription = state.projects[projectID].proj_description;
  const projectTasks = getTasksForProject(state, projectID).map((i) => state.tasks[i]);
  return (
    <div className='project-gantt'>
      <div className="project-gantt-header">
        <div className="project-gantt-title">
          <h1>{projectTitle}</h1>
          <LinkIconContainer projectID={projectID} />
        </div>
        <p>{projectDescription}</p>
      </div>
      <section className="ganttContainer">
        <Gantt projectTasks={projectTasks} />
      </section>
    </div>
  );
};

export default ProjectGantt;
