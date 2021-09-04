import { useState } from 'react';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

import ConfirmButton from './ConfirmButton';
import TeamMember from './TeamMember';

import '../styles/AddProjectForm.scss';

import convertTimestampStringToYMD from '../helpers/dateConvert';

// Styling for the 'chips'
const useStyles = makeStyles((theme) => ({
  // This defines the styling for the 'field' that contains the name 'chips'
  chips: {
    display: 'grid',
    gridTemplateColumns: '150px 150px 150px',
    backgroundColor: 'white'
  },
  // This defines the styling for the actual name 'chips'
  chip: {
    margin: 2,
    backgroundColor: "white",
    border: "solid 1px #4b9fea"
  },
  projectNameDesc: {
    // marginTop: '10px',
    marginBottom: '20px',
  },
  textField: {
    marginTop: '10px',
    marginBottom: '20px',
    width: '180px'
  },
  calendars: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '30px'
  }
}));

// Styling for the drop-down
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      marginTop: 52
    }
  }
};

// Prep date data
// get today's date yyyy-mm-dd
const planStartInit = new Date();
const planEndInit = new Date();
planEndInit.setDate(planEndInit.getDate() + 7);
// convert to string and return in YYYY-MM-DD format
const planStartString = convertTimestampStringToYMD(planStartInit.toString());
const planEndString = convertTimestampStringToYMD(planEndInit.toString());

// Note that the usage duplicate names is troublesome due to the implementation of the checkbox dropdown, as we have to retrieve the ID later.
// Avoid duplicate names for users.
export default function AddProjectForm({ state, userID, close, addProject }) {
  const classes = useStyles();
  const [projectName, setProjectName] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const [planStart, setPlanStart] = useState(planStartString);
  const [planEnd, setPlanEnd] = useState(planEndString);
  const [personName, setPersonName] = useState([]);

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  let managerID = Number(userID);
  const managerObj = state && state.users[managerID];
  const managerName = managerObj.user_name;
  const ids = Object.keys(state.users).filter((userids) => userids !== managerID.toString());
  const names = ids.map((userids) => state.users[userids].user_name);

  const clickSave = (event) => {
    // Looks for the index of each team member in 'names' array, then returns corresponding 'id'.
    const teamIDs = [managerID, ...personName.map((selectedName) => names.findIndex((name) => name === selectedName)).map((index) => Number(ids[index]))];
    const newProject = {
      proj_name: projectName,
      manager_id: managerID,
      manager_name: managerName,
      planned_start: planStart,
      planned_end: planEnd,
      proj_description: projectDesc,
      team_members: teamIDs
    };
    // console.log(newProject);
    addProject(newProject, teamIDs);
    setProjectName('');
    setProjectDesc('');
    setPlanStart(planStartString);
    setPlanEnd(planEndString);
    close(event);
  };

  return (
    <div className="add-project-form-container">
      <div className="add-project-form-top">
        <h1 className="add-project-form-title">Add a project</h1>
        <div className="add-project-form-body">
          <form className="add-project-form">
            <TextField
              id="standard-full-width"
              label="Project Name"
              value={projectName}
              className={classes.projectNameDesc}
              multiline
              margin="normal"
              onChange={(event) => setProjectName(event.target.value)}
            />

            <TextField
              id="standard-full-width"
              label="Project Description"
              value={projectDesc}
              className={classes.projectNameDesc}
              multiline
              margin="normal"
              onChange={(event) => setProjectDesc(event.target.value)}
            />

            <div className={classes.calendars}>
              <TextField
                id="date"
                label="Start Date"
                type="date"
                defaultValue={planStartString}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true
                }}
                onChange={(event) => setPlanStart(event.target.value)}
              />

              <TextField
                id="date"
                label="End Date"
                type="date"
                defaultValue={planEndString}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true
                }}
                onChange={(event) => setPlanEnd(event.target.value)}
              />
            </div>

            <div className="add-project-form-PM">
              <h3>Project Manager</h3>
              <TeamMember name={managerName} border/>
            </div>

            <div className="add-project-form-team-members">
              <h3>Choose some additional team members!</h3>
              {/* Checkbox Dropdown Code */}
              <div className="team-member-container">
                <Select
                  labelId="demo-mutiple-checkbox-label"
                  id="mutiple-checkbox"
                  multiple
                  value={personName}
                  onChange={handleChange}
                  input={<Input />}
                  style={{width: "440px"}}
                  renderValue={(selected) => (
                    <div className={classes.chips}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} className={classes.chip} />
                      ))}
                    </div>
                  )}
                  MenuProps={MenuProps}
                > 
                  {names.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={personName.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="add-project-form-buttons">
        <ConfirmButton saving updateData={clickSave} />
        <ConfirmButton cancelling close={close} />
      </div>
    </div>
  );
}
