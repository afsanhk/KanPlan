import React, { useEffect, useState } from 'react';

// internal components
import TeamMember from './TeamMember';
import ConfirmButton from './ConfirmButton';

// material-ui icons
import AddCircleIcon from '@material-ui/icons/AddCircle';

// material-ui cores/lab
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Backdrop, Fade, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'; //use this to customize the style
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import ListItemText from '@material-ui/core/ListItemText';

import '../styles/AddTaskForm.scss';
import AddUserForm from './AddUserForm';

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
  }
}));

// get today's date yyyy-mm-dd
const today = new Date();
const currentDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().length > 1 ? today.getMonth() + 1 : '0' + (today.getMonth() + 1)}-${today.getDate()}`;

// task status and prioirty list
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

function AddTaskForm({ proj_name, team_members, users }) {
  const classes = useStyles();

  const [currentUsers, setCurrentUsers] = useState([]);
  const [teamMembers, setTeamMembers] = useState(team_members);
  const [state, setState] = useState({ plan_start: currentDate, plan_end: currentDate, task_users: [] });

  // modal state
  const [open, setOpen] = React.useState(false);

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

  const consoleData = () => {
    setState((prev) => ({ ...prev, task_users: currentUsers }));
    console.log(state);
  };

  // modal open function
  const handleOpen = () => {
    setOpen(true);
  };

  // modal close function
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <header className="task-form-header">
        <h1>Add New Task</h1>
      </header>

      <div className="task-form-project_name">
        <div className="task-form-project_name-div">
          <ListItemText primary="Project Name" secondary={proj_name} />
        </div>
      </div>

      <div className="task-form-body">
        <div className="task-form-body-title">
          <div className="task-form-body-title-div">
            <TextField
              id="standard-full-width"
              label="Task title"
              style={{ margin: 8 }}
              placeholder="Write task title"
              multiline
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
              onChange={(event) => setState((prev) => ({ ...prev, title: event.target.value }))}
            />
          </div>
        </div>
        <div className="task-form-body-description">
          <div className="task-form-body-description-div">
            <TextField
              id="standard-full-width"
              label="Task Description"
              style={{ margin: 8 }}
              placeholder="Write task description"
              fullWidth
              multiline
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
              onChange={(event) => setState((prev) => ({ ...prev, task_description: event.target.value }))}
            />
          </div>
        </div>

        <div className="task-form-body-dropdowns">
          {/* <div className="task-form-body-dropdowns-project">
            <h1>{proj_name}</h1>
          </div> */}

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
                onChange={(value) => setState((prev) => ({ ...prev, status_name: value.target.innerText, status_id: status_id[value.target.innerText] }))}
              />
              <Autocomplete
                id="combo-box-demo"
                options={taskPriority}
                getOptionLabel={(option) => option.name}
                style={{ width: '200px' }}
                renderInput={(params) => <TextField {...params} label="Priority" variant="outlined" />}
                onChange={(value) => setState((prev) => ({ ...prev, priority_name: value.target.innerText, priority_id: priority_id[value.target.innerText] }))}
              />
            </div>
          </div>
        </div>

        {currentUsers && (
          <>
            <div className="task-form-body-members-title">
              <div className="task-form-body-members-title-div">
                <h2>Assignees</h2>
                <IconButton size="small" onClick={handleOpen}>
                  <AddCircleIcon className={classes.teamMemberButton} fontSize="large" />
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
                    <AddUserForm users={users} teamMembers={teamMembers} currentUsers={currentUsers} addUser={addUser} projectName={proj_name} />
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

      <footer className="task-form-footer">
        <div>
          <ConfirmButton saving consoleData={consoleData} />
          <ConfirmButton cancelling />
        </div>
      </footer>
    </div>
  );
}

export default AddTaskForm;
