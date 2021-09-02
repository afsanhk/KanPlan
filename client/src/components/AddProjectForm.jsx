import { useState } from 'react';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";

import ConfirmButton from './ConfirmButton';
import TeamMember from './TeamMember';

import '../styles/AddProjectForm.scss';

import convertTimestampStringToYMD from '../helpers/dateConvert';
import CheckboxDropdown from './CheckboxDropdown';

// Styling for the 'chips'
const useStyles = makeStyles((theme) => ({
  chips: {
    display: "flex",
    flexDirection: "row"
  },
  chip: {
    margin: 2
  },
  noLabel: {
    marginTop: theme.spacing(3)
  }
}));

// Styling for the drop-down
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

// Prep date data
// get today's date yyyy-mm-dd
const planStartInit = new Date();
const planEndInit = new Date();
planEndInit.setDate(planEndInit.getDate() + 7); 
// convert to string and return in YYYY-MM-DD format
const planStartString = convertTimestampStringToYMD(planStartInit.toString())
const planEndString = convertTimestampStringToYMD(planEndInit.toString())

export default function AddProjectForm({ state, userID, close }) {
  const classes = useStyles();
  const [projectName, setProjectName] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const [planStart,setPlanStart] = useState(planStartString);
  const [planEnd,setPlanEnd] = useState(planEndString);
  const [personName, setPersonName] = useState([]);

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  const names = Object.keys(state.users).map(userID => state.users[userID].user_name);

  const clickSave = (event) => {
    console.log(userID, projectName, projectDesc, planStart, planEnd);
    setProjectName('');
    setProjectDesc('');
    setPlanStart(planStartString);
    setPlanEnd(planEndString);
    close(event);
  };

  const userObj = state && state.users[userID];

  return (
    <div className="add-project-form-container">
      <h1 className="add-project-form-title">Add a project</h1>
      <div className="add-project-form-body">
        <form className="add-project-form">
          <TextField
            id="standard-full-width"
            label="Project Name"
            value={projectName}
            style={{ margin: 8 }}
            placeholder="Write project name here..."
            multiline
            margin="normal"
            onChange={(event) => setProjectName(event.target.value)}
          />

          <TextField
            id="standard-full-width"
            label="Project Description"
            value={projectDesc}
            style={{ margin: 8 }}
            placeholder="Write project name here..."
            multiline
            margin="normal"
            onChange={(event) => setProjectDesc(event.target.value)}
          />

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

          <div className="add-project-form-PM">
            <h3>Project Manager</h3>
            <TeamMember name={userObj.user_name} />
          </div>

          <div className="add-project-form-team-members">
            <h3>Choose some additional team members!</h3>
            <div className="team-member-container">
              <Select
                labelId="demo-mutiple-checkbox-label"
                id="mutiple-checkbox"
                multiple
                value={personName}
                onChange={handleChange}
                input={<Input />}
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
      <div class="add-project-form-buttons">
        <ConfirmButton saving updateData={clickSave} />
        <ConfirmButton cancelling close={close} />
      </div>
      <img style= {{width: '200px', marginTop: '20px', marginLeft:'140px'}}
          src="https://static.boredpanda.com/blog/wp-content/uploads/2018/12/5c24c2292938a_wegda68zn5021__700.jpg"
          alt="hehe cat"
        />
    </div>
  );
}
