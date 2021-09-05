import React, { useEffect, useState, uesRef, useRef } from 'react';

// internal components
import TeamMember from './TeamMember';
import ConfirmButton from './ConfirmButton';

// material-ui icons
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';

// material-ui cores/lab
import Autocomplete from '@material-ui/lab/Autocomplete';
import { IconButton, ListItemText, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'; //use this to customize the style
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import '../styles/EditTaskForm.scss';
import AddUserForm from './AddUserForm';

import convertTimestampStringToYMD from '../helpers/dateConvert';

// material-ui styles
const useStyles = makeStyles((theme) => ({
  teamMemberButton: {
    color: '#bdbdbd'
  },
  icon: {
    margin: '5px'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '3px #757575 solid',
    'border-radius': '8px',
    boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 2, 2),
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
    width: '50vw',
    top: '5vh',
    left: '28vw',
    position: 'fixed'
  }
}));

// task status and priority list
const taskStatus = [{ name: 'To-Do' }, { name: 'Late' }, { name: 'In Progress' }, { name: 'Done' }];
const taskPriority = [{ name: 'High' }, { name: 'Low' }, { name: 'None' }];
const priority_id = {
  None: 1,
  Low: 2,
  High: 3
};

const status_id = {
  'To-Do': 1,
  Late: 2,
  'In progress': 3,
  Done: 4
};

function EditTaskForm({ tasks, projects, users, close, editTask }) {
  const classes = useStyles();

  // getTeamMembers function = helper function to return a array of team members of specific project
  const getTeamMembers = (projectName) => {
    if (projectName) {
      const currentProjectObj = projects.filter((project) => project.proj_name === projectName);

      return currentProjectObj[0].team_members;
    }
  };

  const [currentUsers, setCurrentUsers] = useState(tasks.task_users);
  const [teamMembers, setTeamMembers] = useState(null);
  const [error, setError] = useState(true);
  const [clickTitle, setClickTitle] = useState(false);
  const [clickDesc, setClickDesc] = useState(false);
  const [state, setState] = useState({
    title: tasks.title,
    task_description: tasks.task_description,
    plan_start: tasks.plan_start,
    plan_end: tasks.plan_end
  });

  const [open, setOpen] = React.useState(false);

  const taskID = tasks.id;

  const handleTitleClick = () => {
    setClickTitle(!clickTitle);
  };

  const handleDescClick = () => {
    setClickDesc(!clickDesc);
  };

  // remove user from Assignees
  const removeUser = (user_id) => {
    setCurrentUsers((prev) => {
      const newUsers = [...prev].filter((id) => id !== user_id);
      setState((prev) => ({ ...prev, task_users: newUsers }));
      return newUsers;
    });
  };

  // add user from modal to Assignees
  const addUser = (user_id) => {
    setCurrentUsers((prev) => {
      const newUsers = [...prev, user_id];
      setState((prev) => ({ ...prev, task_users: newUsers }));
      return newUsers;
    });
  };

  // modal open function
  const handleOpen = () => {
    setOpen(true);
  };

  // modal close function
  const handleClose = () => {
    setOpen(false);
  };

  // modal save function
  function updateData() {
    editTask(state, taskID);
    close();
  }

  const titleRef = useRef(null);
  // const [disableHover, setDisableHover] = useState(true);

  useEffect(() => {
    // setCurrentUsers(getTeamMembers(currentProject));
    setTeamMembers(getTeamMembers(tasks.proj_name));
    setState((prev) => ({ ...prev, proj_name: tasks.proj_name, task_users: currentUsers }));
    // if (titleRef.current.clientWidth < titleRef.current.scrollWidth) {
    //   setDisableHover(false);
    // }
  }, []);

  useEffect(() => {
<<<<<<< HEAD
    setError(!state.task_title || !state.task_description);
=======
    setError(!state.title || !state.task_description);
>>>>>>> master
  }, [state]);

  return (
    <div className="edit-task-form">
      <div className="task-form-header-body">
        <header className="task-form-header">
          {!clickTitle ? (
            <div className="task-form-header-title">
<<<<<<< HEAD
              <ListItemText primary="Task Title" secondary={state.task_title} secondaryTypographyProps={{ style: { marginTop: '2px' } }} style={{ marginTop: '16px', marginBottom: '8px' }} />
=======
              <ListItemText primary="Task Title" secondary={state.title} secondaryTypographyProps={{ style: { marginTop: '2px' } }} style={{ marginTop: '16px', marginBottom: '8px' }} />
>>>>>>> master
              <IconButton size="small" className={classes.icon} onClick={handleTitleClick}>
                <EditOutlinedIcon />
              </IconButton>
            </div>
          ) : (
            <div className="task-form-header-title">
              <TextField
                id="standard-full-width"
                label="Task Title"
                placeholder="Write Title"
                defaultValue={state.title}
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
                onChange={(event) => setState((prev) => ({ ...prev, title: event.target.value }))}
              />

              <IconButton size="small" className={classes.icon} onClick={handleTitleClick}>
                <SaveOutlinedIcon />
              </IconButton>
            </div>
          )}
          {/* <Tooltip title={tasks.title} placement="top-start" c={disableHover}>
            <h1 ref={titleRef}>{tasks.title}</h1>
          </Tooltip> */}
        </header>

        <div className="task-form-body">
          <div className="task-form-body-description">
            {!clickDesc ? (
              <div className="task-form-body-description-div">
                <ListItemText
                  primary="Task Description"
                  secondary={state.task_description}
                  secondaryTypographyProps={{ style: { marginTop: '2px' } }}
                  style={{ marginTop: '16px', marginBottom: '7px' }}
                />
                <IconButton size="small" className={classes.icon} onClick={handleDescClick}>
                  <EditOutlinedIcon />
                </IconButton>
              </div>
            ) : (
              <div className="task-form-body-description-div">
                <TextField
                  id="standard-full-width"
                  label="Task Description"
                  placeholder="Write description"
                  defaultValue={state.task_description}
                  fullWidth
                  multiline
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                    style: { fontSize: '1em', marginTop: 2, paddingBottom: '3px' }
                  }}
                  InputProps={{
                    style: { fontSize: '1.5em', color: '#757575', width: '100%' }
                  }}
                  onChange={(event) => setState((prev) => ({ ...prev, task_description: event.target.value }))}
                />

                <IconButton size="small" className={classes.icon} onClick={handleDescClick}>
                  <SaveOutlinedIcon />
                </IconButton>
              </div>
            )}
          </div>
          <div className="task-form-body-dropdowns">
            <div className="task-form-body-dropdowns-project">
              {/* <Autocomplete
                id="combo-box-demo"
                options={projects}
                getOptionLabel={(option) => option.proj_name}
                style={{ width: '80%' }}
                renderInput={(params) => <TextField {...params} label="Project Title" variant="outlined" />}
                onChange={(value) => {
                  setCurrentProject(value.target.innerText);
                }}
              /> */}
              <div className="task-form-body-dropdowns-project-div">
                <ListItemText primary="Project Name" secondary={tasks.proj_name} />
              </div>
            </div>

            <div className="task-form-body-dropdowns-date">
              <div className="task-form-body-dropdowns-date-helper">
                <TextField
                  id="date"
                  label="Start Date"
                  type="date"
                  defaultValue={convertTimestampStringToYMD(tasks.plan_start)}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={(event) => setState((prev) => ({ ...prev, plan_start: event.target.value }))}
                />
                <TextField
                  id="date"
                  label="End Date"
                  type="date"
                  defaultValue={convertTimestampStringToYMD(tasks.plan_end)}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={(event) => setState((prev) => ({ ...prev, plan_end: event.target.value }))}
                />
              </div>
            </div>

            <div className="task-form-body-dropdowns-status">
              <div className="task-form-body-dropdowns-status-div">
                <Autocomplete
                  id="combo-box-demo"
                  options={taskStatus}
                  getOptionLabel={(option) => option.name}
                  defaultValue={{ name: tasks.status }}
                  style={{ width: '200px' }}
                  renderInput={(params) => <TextField {...params} label="Status" variant="outlined" />}
                  onChange={(value) => setState((prev) => ({ ...prev, status: value.target.innerText, status_id: status_id[value.target.innerText] }))}
                  disableClearable
                />
                <Autocomplete
                  id="combo-box-demo"
                  options={taskPriority}
                  getOptionLabel={(option) => option.name}
                  defaultValue={{ name: tasks.priority_name }}
                  style={{ width: '200px' }}
                  renderInput={(params) => <TextField {...params} label="Priority" variant="outlined" />}
                  onChange={(value) => setState((prev) => ({ ...prev, priority_name: value.target.innerText, priority_id: priority_id[value.target.innerText] }))}
                  disableClearable
                />
              </div>
            </div>
          </div>

          {currentUsers && (
            <>
              <div className="task-form-body-members-title">
                <div>
                  <h2>Assignees</h2>
                  <IconButton size="small" onClick={handleOpen}>
                    <AddCircleIcon className={classes.teamMemberButton} fontSize="medium" />
                  </IconButton>
                  <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                      timeout: 500
                    }}
                  >
                    <Fade in={open}>
                      <AddUserForm users={users} teamMembers={teamMembers} currentUsers={currentUsers} addUser={addUser} projectName={tasks.proj_name} />
                    </Fade>
                  </Modal>
                </div>
              </div>

              <div className="task-form-body-members">
                <div className="task-form-body-members-div">
                  {currentUsers.map((id, index) => (
                    <TeamMember key={index} id={id} name={users[id].user_name} remove border removeUser={removeUser} />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <footer className="task-form-footer">
        <div>
          <ConfirmButton cancelling close={close} />
          {error ? <ConfirmButton saving error /> : <ConfirmButton saving updateData={updateData} />}
        </div>
      </footer>
    </div>
  );
}

export default EditTaskForm;
