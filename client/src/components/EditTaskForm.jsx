import React, { useEffect, useState } from 'react';

// internal components
import TeamMember from './TeamMember';
import ConfirmButton from './ConfirmButton';

// material-ui icons
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';

// material-ui cores/lab
import Autocomplete from '@material-ui/lab/Autocomplete';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'; //use this to customize the style
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';

import './EditTaskForm.scss';

// material-ui styles
const useStyles = makeStyles((theme) => ({
  teamMemberButton: {
    color: '#bdbdbd'
  },
  icon: {
    margin: '5px'
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

// modal style function
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

// get today's date yyyy-mm-dd
const today = new Date();
const currentDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().length > 1 ? today.getMonth() + 1 : '0' + (today.getMonth() + 1)}-${today.getDate()}`;

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

function EditTaskForm({ tasks, userProjects }) {
  const classes = useStyles();

  // getTeamMembers function = helper function to return a array of team members of specific project
  const getTeamMembers = (projectName) => {
    if (projectName) {
      const currentProjectObj = userProjects.filter((project) => project.proj_name === projectName);

      return currentProjectObj[0].proj_users;
    }
  };

  const [currentUsers, setCurrentUsers] = useState(null);
  const [currentProject, setCurrentProject] = useState(null);
  const [clickDesc, setClickDesc] = useState(false);
  const [state, setState] = useState({ task_description: tasks.description, plan_start: currentDate, plan_end: currentDate });

  // modal state
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setClickDesc(!clickDesc);
  };

  useEffect(() => {
    if (currentProject) {
      setCurrentUsers(() => getTeamMembers(currentProject));
    }
    setState((prev) => ({ ...prev, proj_name: currentProject, proj_users: currentUsers }));
  }, [currentProject]);

  const removeUser = (user_name) => {
    setCurrentUsers((prev) => {
      const newUsers = [...prev].filter((user) => user.name !== user_name);
      setState((prev) => ({ ...prev, proj_users: newUsers }));
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

  // modal html and css
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Text in a modal</h2>
      <p id="simple-modal-description">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
    </div>
  );

  return (
    <div>
      <header className="task-form-header">
        <h1>{tasks.title}</h1>
      </header>

      <div className="task-form-body">
        <div className="task-form-body-description">
          {!clickDesc ? (
            <div className="task-form-body-description-div">
              <p>{state.task_description}</p>
              <IconButton size="small" className={classes.icon} onClick={handleClick}>
                <EditOutlinedIcon />
              </IconButton>
            </div>
          ) : (
            <div className="task-form-body-description-div">
              <TextField
                id="standard-full-width"
                label="Description"
                style={{ margin: 8 }}
                placeholder="Write description"
                fullWidth
                multiline
                margin="normal"
                InputLabelProps={{
                  shrink: true
                }}
                onChange={(event) => setState((prev) => ({ ...prev, task_description: event.target.value }))}
              />

              <IconButton size="small" className={classes.icon} onClick={handleClick}>
                <SaveOutlinedIcon />
              </IconButton>
            </div>
          )}
        </div>

        <div className="task-form-body-dropdowns">
          <div className="task-form-body-dropdowns-project">
            <Autocomplete
              id="combo-box-demo"
              options={userProjects}
              getOptionLabel={(option) => option.proj_name}
              style={{ width: '80%' }}
              renderInput={(params) => <TextField {...params} label="Project Title" variant="outlined" />}
              onChange={(value) => {
                setCurrentProject(value.target.innerText);
                setCurrentUsers(getTeamMembers(value.target.innerText));
              }}
            />
          </div>

          <div className="task-form-body-dropdowns-date">
            <div className="task-form-body-dropdowns-date-helper">
              <TextField
                id="date"
                label="Start Date"
                type="date"
                defaultValue={currentDate}
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
                defaultValue={currentDate}
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
                style={{ width: '200px' }}
                renderInput={(params) => <TextField {...params} label="Status" variant="outlined" />}
                onChange={(value) => setState((prev) => ({ ...prev, status: value.target.innerText, status_id: status_id[value.target.innerText] }))}
              />
              <Autocomplete
                id="combo-box-demo"
                options={taskPriority}
                getOptionLabel={(option) => option.name}
                style={{ width: '200px' }}
                renderInput={(params) => <TextField {...params} label="Priority" variant="outlined" />}
                onChange={(value) => setState((prev) => ({ ...prev, priority: value.target.innerText, priority_id: priority_id[value.target.innerText] }))}
              />
            </div>
          </div>
        </div>

        {currentUsers && (
          <>
            <div className="task-form-body-members-title">
              <div>
                <h2>Team Members</h2>
                <IconButton size="small" onClick={handleOpen}>
                  <AddCircleIcon className={classes.teamMemberButton} fontSize="large" />
                </IconButton>
                <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
                  {body}
                </Modal>
              </div>
            </div>

            <div className="task-form-body-members">
              <div className="task-form-body-members-div">
                {currentUsers.map((user, index) => (
                  <TeamMember key={index} name={user.name} remove border removeUser={removeUser} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <footer className="task-form-footer">
        <div>
          <ConfirmButton
            saving
            consoleData={() => {
              console.log(state);
            }}
          />
          <ConfirmButton deleting />
        </div>
      </footer>
    </div>
  );
}

export default EditTaskForm;
