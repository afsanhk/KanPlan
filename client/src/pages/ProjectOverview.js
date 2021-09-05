import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// Components
import ProjectOverviewTable from '../components/ProjectOverviewTable';
import LinkIconContainer from '../components/LinkIconContainer';
import HomepageChartA from '../components/HomepageChartA';

// Helpers
import { getTasksForProject, getUsersForProject, getProjectStatus } from '../helpers/selectors';

//For the edit and delete modals
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

//for edit project title and desc
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';


import DeleteTaskForm from '../components/DeleteTaskForm';
import ProjectOverviewUpcomingTasks from '../components/ProjectOverviewUpcomingTasks';

import '../styles/ProjectOverview.scss';

const useStyles = makeStyles((theme) => ({
  button: {
    marginLeft: theme.spacing(3)
  }
}));

const ProjectOverview = ({ 
  state, 
  deleteTask, 
  editTask, 
  userID, 
  deleteProject, 
  updateProjectUsers, 
  addTask, 
  updateTaskStatus, 
  updateTaskPriority, 
  editProject 
}) => {
  
  const classes = useStyles();
  let { projectID } = useParams();
  const [open, setOpen] = useState(false); // modal state
  const [clickProjectEdit, setProjectEdit] = useState(false); //open or close the project edit options
  const [projData, setProjData] = useState({
    proj_name: state.projects[projectID].proj_name,
    proj_description: state.projects[projectID].proj_description,
  });


  const projectTasks = getTasksForProject(state, projectID).map((i) => state.tasks[i]);
  const projectUsers = getUsersForProject(state, projectID);
  const projectTitle = state.projects[projectID].proj_name;
  const projectDescription = state.projects[projectID].proj_description;
  const projectStatus = getProjectStatus(state, projectID)
  let projectStatusPercentage = '0 tasks';

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

  // open proj title and desc function
  const handleProjectEditClick = () => {
    setProjectEdit(!clickProjectEdit);
  };

  //save proj title and desc edits
  const updateData = () => {
    handleProjectEditClick()
    editProject(projData, projectID)
  }

  return (
    <>
      <div className="project-overview">
        <div className="project-overview-header">
          <div className="project-overview-title">
            { !clickProjectEdit ? (
              <div className="project-overview-edit">
                <h1>{projectTitle}</h1>
                <IconButton size="small" >
                  <EditOutlinedIcon onClick={handleProjectEditClick}/>
                </IconButton>
              </div>
            ) : (
              <div className="project-overview-edit">
                <TextField
                id="standard-full-width"
                label="Project Title"
                placeholder="Write project title"
                defaultValue={projectTitle}
                fullWidth
                multiline
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                  style: { fontSize: '1em', marginTop: 0 }
                }}
                InputProps={{
                  // disableUnderline: true,
                  style: { fontSize: '1.7em', color: '#757575', width: '100%' }
                }}
                onChange={(event) => setProjData((prev) => ({ ...prev, proj_name: event.target.value }))}
              />
                <IconButton size="small" >
                  <SaveOutlinedIcon onClick={updateData}/>
                </IconButton>
              </div>
            )}
            
            
            <div className="project-overview-links">
              <LinkIconContainer projectID={projectID} text state={state} updateProjectUsers={updateProjectUsers} />
              <Button variant="outlined" color="secondary" className={classes.button} onClick={handleOpen}>
                Delete project
              </Button>
            </div>
          </div>
          { !clickProjectEdit ? (
            <p>{projectDescription}</p>
          ) : (

            <TextField
                id="standard-full-width"
                label="Project Description"
                placeholder="Write project description"
                defaultValue={projectDescription}
                fullWidth
                multiline
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                  style: { fontSize: '1em', marginTop: 0 }
                }}
                InputProps={{
                  // disableUnderline: true,
                  style: { fontSize: '1.7em', color: '#757575', width: '100%' }
                }}
                onChange={(event) => setProjData((prev) => ({ ...prev, proj_description: event.target.value }))}
              />

          )}
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
              editTask={editTask}
              updateTaskStatus={updateTaskStatus}
              updateTaskPriority={updateTaskPriority}
            />
          </div>
          <div className="project-overview-body-right">
            <div className="project-overview-charts">
              <HomepageChartA
                chartInformation={projectStatusPercentage}
                chartTitle={'Project Task Completion'}
                chartColor={['#7bbf5e', 'rgba(189, 189, 189, 0.3)']}
                data={[projectStatus ? projectStatus.completedTasks : 0, projectStatus ? projectStatus.incompleteTasks : 0]}
              />
            </div>
            <div className="project-overview-upcoming-tasks">
              <ProjectOverviewUpcomingTasks projectTasks={projectTasks} userID={userID} />
            </div>
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
