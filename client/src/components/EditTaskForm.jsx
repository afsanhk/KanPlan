import React, { useEffect, useState } from 'react';
import TeamMember from './TeamMember';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import { makeStyles } from '@material-ui/core/styles'; //use this to customize the style

import './EditTaskForm.scss';
import ConfirmButton from './ConfirmButton';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles({
  teamMemberButton: {
    color: '#bdbdbd'
  },
  icon: {
    margin: '5px'
  }
});

const today = new Date();
const currentDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().length > 1 ? today.getMonth() + 1 : '0' + (today.getMonth() + 1)}-${today.getDate()}`;

function EditTaskForm({ tasks, userProjects, taskStatus, taskPriority }) {
  const classes = useStyles();

  const [currentUsers, setCurrentUsers] = useState(null);
  const [currentProject, setCurrentProject] = useState(null);
  const [clickDesc, setClickDesc] = useState(false);
  const [state, setState] = useState({ description: tasks.description });

  // getTeamMembers function = helper function to return a array of team members of specific project
  const getTeamMembers = (projectName) => {
    if (projectName) {
      const currentProjectObj = userProjects.filter((project) => project.proj_name === projectName);

      return currentProjectObj[0].proj_users;
    }
  };

  const handleClick = () => {
    setClickDesc(!clickDesc);
  };

  useEffect(() => {
    setState((prev) => ({ ...prev, proj_name: currentProject }));
    setCurrentUsers(getTeamMembers(currentProject));
  }, [currentProject]);

  const removeUser = (user_name) => {
    console.log('removing user', user_name);
  };

  return (
    <div>
      <header className="task-form-header">
        <h1>{tasks.title}</h1>
      </header>

      <div className="task-form-body">
        <div className="task-form-body-description">
          {!clickDesc ? (
            <>
              <p>{state.description}</p>
              <IconButton size="small" className={classes.icon} onClick={handleClick}>
                <EditOutlinedIcon />
              </IconButton>
            </>
          ) : (
            <>
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
                onChange={(event) => setState((prev) => ({ ...prev, description: event.target.value }))}
              />

              <IconButton size="small" className={classes.icon} onClick={handleClick}>
                <SaveOutlinedIcon />
              </IconButton>
            </>
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
              onChange={(value) => setCurrentProject(value.target.innerText)}
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
                onChange={(event) => setState((prev) => ({ ...prev, startDate: event.target.value }))}
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
                onChange={(event) => setState((prev) => ({ ...prev, endDate: event.target.value }))}
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
                onChange={(value) => setState((prev) => ({ ...prev, status: value.target.innerText }))}
              />
              <Autocomplete
                id="combo-box-demo"
                options={taskPriority}
                getOptionLabel={(option) => option.name}
                style={{ width: '200px' }}
                renderInput={(params) => <TextField {...params} label="Priority" variant="outlined" />}
                onChange={(value) => setState((prev) => ({ ...prev, priority: value.target.innerText }))}
              />
            </div>
          </div>
        </div>

        {currentUsers && (
          <>
            <div className="task-form-body-members-title">
              <div>
                <h2>Team Members</h2>
                <IconButton size="small">
                  <AddCircleIcon className={classes.teamMemberButton} fontSize="large" />
                </IconButton>
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
          <ConfirmButton saving data={state} />
          <ConfirmButton deleting />
        </div>
      </footer>
    </div>
  );
}

export default EditTaskForm;
