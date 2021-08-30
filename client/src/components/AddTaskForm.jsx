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
import ListItemText from '@material-ui/core/ListItemText';

import './AddTaskForm.scss';

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

function AddTaskForm({ proj_name, proj_users, taskStatus, taskPriority }) {
  const classes = useStyles();

  const [assignees, setAssignees] = useState([]);
  const [clickDesc, setClickDesc] = useState(false);
  const [state, setState] = useState({});

  // modal state
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setClickDesc(!clickDesc);
  };

  const removeAssignee = (user_name) => {
    setAssignees((prev) => {
      const newUsers = [...prev].filter((user) => user.name !== user_name);
      return newUsers;
    });
  };

  const consoleData = () => {
    setState((prev) => ({ ...prev, assignees: assignees }));
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
        <h1>Add New Task</h1>
      </header>

      <div className="task-form-project_name">
        <div className="task-form-project_name-div">
          <ListItemText primary="Project Name" secondary={proj_name} />
        </div>
      </div>

      <div className="task-form-body">
        <div className="task-form-body-description">
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

        {assignees && (
          <>
            <div className="task-form-body-members-title">
              <div style={{ borderBottom: assignees > 0 ? '2px solid black' : 'none' }}>
                <h2>Assignees</h2>
                <IconButton size="small" onClick={handleOpen}>
                  <AddCircleIcon className={classes.teamMemberButton} fontSize="large" />
                </IconButton>
                <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
                  {body}
                </Modal>
              </div>
            </div>

            <div className="task-form-body-members">
              <div className="task-form-body-members-div" style={{ height: assignees > 0 ? '160px' : 'auto' }}>
                {assignees.map((user, index) => (
                  <TeamMember key={index} name={user.name} remove border removeUser={removeAssignee} />
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
