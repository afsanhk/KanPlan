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
const currentDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().length > 1 ? today.getMonth() + 1 : '0' + (today.getMonth() + 1)}-${
  today.getDate().toString().length > 1 ? today.getDate() : '0' + today.getDate()
}`;

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
  'In Progress': 3,
  Done: 4
};

function AddTaskForm({ proj_name, team_members, users, close, projectID, status, addTask }) {
  const classes = useStyles();

  const [currentUsers, setCurrentUsers] = useState([]);
  const [teamMembers, setTeamMembers] = useState(team_members);
  const [error, setError] = useState(true);
  const [state, setState] = useState({ plan_start: currentDate, plan_end: currentDate, task_users: [], proj_name: proj_name, project_id: projectID, status: status, status_id: status_id[status] });

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

  // console log data
  const consoleData = () => {
    setState((prev) => ({ ...prev, task_users: currentUsers }));
  };

  const updateData = () => {
    addTask({ ...state, project_id: projectID }, projectID, currentUsers);
    close();
  };

  // modal open function
  const handleOpen = () => {
    setOpen(true);
  };

  // modal close function
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setError(!state.title || !state.task_description || !state.priority_name || !state.task_users.length || !state.status);
  }, [state]);

  return (
    <div className="task-form">
      <div className="task-form-header-body">
        <header className="task-form-header">
          <h1>Add New Task</h1>
        </header>

        <div className="task-form-project_name">
          <div className="task-form-project_name-div">
            <ListItemText primary="Project Name" secondary={proj_name} style={{ marginBottom: 0 }} />
          </div>
        </div>

        <div className="task-form-body">
          <div className="task-form-body-title">
            <div className="task-form-body-title-div">
              <TextField
                id="standard-full-width"
                label="Task title"
                placeholder="Write task title"
                multiline
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                  style: { fontSize: '1.1em', marginTop: 0 }
                }}
                InputProps={{
                  style: { fontSize: '1.3em', color: '#545454', fontWeight: 500 }
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
                placeholder="Write task description"
                fullWidth
                multiline
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                  style: { fontSize: '1.1em', marginTop: 0 }
                }}
                InputProps={{
                  style: { fontSize: '1.3em', color: '#545454', fontWeight: 500 }
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
                {status ? (
                  <Autocomplete
                    id="combo-box-demo"
                    options={taskStatus}
                    inputValue={status}
                    getOptionLabel={(option) => option.name}
                    style={{ width: '200px' }}
                    renderInput={(params) => <TextField {...params} label="Status" variant="outlined" />}
                    onChange={(value) => setState((prev) => ({ ...prev, status: value.target.innerText, status_id: status_id[value.target.innerText] }))}
                  />
                ) : (
                  <Autocomplete
                    id="combo-box-demo"
                    options={taskStatus}
                    getOptionLabel={(option) => option.name}
                    style={{ width: '200px' }}
                    renderInput={(params) => <TextField {...params} label="Status" variant="outlined" />}
                    onChange={(value) => setState((prev) => ({ ...prev, status: value.target.innerText, status_id: status_id[value.target.innerText] }))}
                  />
                )}
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
      </div>
      <footer className="task-form-footer">
        <div>
          <ConfirmButton cancelling close={close} />
          {error ? <ConfirmButton saving error /> : <ConfirmButton saving consoleData={consoleData} updateData={updateData} />}
        </div>
      </footer>
    </div>
  );
}

export default AddTaskForm;
