import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// Components
import ProjectOverviewTable from '../components/ProjectOverviewTable';
import LinkIconContainer from '../components/LinkIconContainer';
import HomepageChartA from '../components/HomepageChartA';
import HomepageChartB from '../components/HomepageChartB';

// Helpers
import { getTasksForProject, getUsersForProject, getProjectStatus } from '../helpers/selectors';

//For the edit and delete modals
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import DeleteTaskForm from '../components/DeleteTaskForm';

import '../styles/ProjectOverview.scss';

const useStyles = makeStyles((theme) => ({
  button: {
    marginLeft: theme.spacing(3)
  }
}));

const ProjectOverview = ({ state, deleteTask, userID, deleteProject, updateProjectUsers, addTask, updateTaskStatus, updateTaskPriority }) => {
  const classes = useStyles();
  let { projectID } = useParams();
  const [open, setOpen] = useState(false); // modal state

  const projectTasks = getTasksForProject(state, projectID).map((i) => state.tasks[i]);
  const projectUsers = getUsersForProject(state, projectID);
  const projectTitle = state.projects[projectID].proj_name;
  const projectDescription = state.projects[projectID].proj_description;
  const projectStatus = getProjectStatus(state, projectID);
  let projectStatusPercentage;

  if (projectStatus) {
    projectStatusPercentage = Math.round(100 * (projectStatus.completedTasks / projectStatus.totalTasks)) + '%';
  }

  // modal open function
  const handleOpen = () => {
    setOpen(true);
  };

  // modal close function
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="project-overview">
        <div className="project-overview-header">
          <div className="project-overview-title">
            <h1>{projectTitle}</h1>
            <div className="project-overview-links">
              <LinkIconContainer projectID={projectID} text state={state} updateProjectUsers={updateProjectUsers} />
              <Button variant="outlined" color="secondary" className={classes.button} onClick={handleOpen}>
                Delete project
              </Button>
            </div>
          </div>
          <p>{projectDescription}</p>
        </div>
        <div className="project-overview-body">
          <div className="project-overview-table">
            <ProjectOverviewTable
              state={state}
              userID={userID}
              projectID={projectID}
              projectTasks={projectTasks}
              projectUsers={projectUsers}
              deleteTask={deleteTask}
              addTask={addTask}
              updateTaskStatus={updateTaskStatus}
              updateTaskPriority={updateTaskPriority}
            />
          </div>
          <div>
            <div className="project-overview-charts">
              <HomepageChartA
                chartInformation={projectStatusPercentage}
                chartTitle={'Project Task Completion'}
                chartColor={['#7bbf5e', 'rgba(189, 189, 189, 0.3)']}
                data={[projectStatus ? projectStatus.completedTasks : 0, projectStatus ? projectStatus.incompleteTasks : 0]}
              />
            </div>
            <div className="project-overview-inspiration"></div>
          </div>
        </div>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <DeleteTaskForm close={handleClose} deleteProject={deleteProject} project={state.projects[projectID]} />
        </Fade>
      </Modal>
    </>
  );
};

export default ProjectOverview;
