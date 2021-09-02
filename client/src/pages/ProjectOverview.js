import { useEffect } from 'react'
import { useParams } from "react-router-dom";
// Components
import ProjectOverviewTable from "../components/ProjectOverviewTable";
import LinkIconContainer from "../components/LinkIconContainer";
import HomepageChartA from "../components/HomepageChartA";
import HomepageChartB from "../components/HomepageChartB";

// Helpers
import { getTasksForProject, getUsersForProject, getProjectStatus } from "../helpers/selectors";

import "../styles/ProjectOverview.scss";

const ProjectOverview = ({ state, deleteTask, userID }) => {
  let { projectID } = useParams();

  const projectTasks = getTasksForProject(state, projectID).map((i) => state.tasks[i]);
  const projectUsers = getUsersForProject(state, projectID);
  const projectTitle = state.projects[projectID].proj_name;
  const projectDescription = state.projects[projectID].proj_description;
  const projectStatus = getProjectStatus(state, projectID)
  let projectStatusPercentage; 
  
  if (projectStatus) {
    projectStatusPercentage = Math.round(100 * (projectStatus.completedTasks / projectStatus.totalTasks)) + '%'
  }


  return (
    <div className="project-overview">
      <div className="project-overview-header">
        <div className="project-overview-title">
          <h1>{projectTitle}</h1>
          <LinkIconContainer projectID={projectID} text />
        </div>
        <p>{projectDescription}</p>
      </div>
      <div className='project-overview-body'>
        <div className='project-overview-table'>
          <ProjectOverviewTable
            state={state}
            userID={userID}
            projectID={projectID}
            projectTasks={projectTasks}
            projectUsers={projectUsers}
            deleteTask={deleteTask}
          />
        </div>
        <div>
          <div className='project-overview-charts'>
            <HomepageChartA 
              chartInformation={projectStatusPercentage} 
              chartTitle={'Project Task Completion'} 
              chartColor={['#7bbf5e', 'rgba(189, 189, 189, 0.3)']} 
              data={[projectStatus ? projectStatus.completedTasks : 0, projectStatus ? projectStatus.incompleteTasks : 0]}
              />
          </div>
          <div className='project-overview-inspiration'>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectOverview;
