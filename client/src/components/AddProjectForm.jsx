import { useState } from 'react';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import ConfirmButton from './ConfirmButton';
import TeamMember from './TeamMember';

import '../styles/AddProjectForm.scss';

import convertTimestampStringToYMD from '../helpers/dateConvert';

// Prep date data
// get today's date yyyy-mm-dd
const planStartInit = new Date();
const planEndInit = new Date();
planEndInit.setDate(planEndInit.getDate() + 7); 
// convert to string and return in YYYY-MM-DD format
const planStartString = convertTimestampStringToYMD(planStartInit.toString())
const planEndString = convertTimestampStringToYMD(planStartInit.toString())


export default function AddProjectForm({ state, userID, close }) {
  const [projectName, setProjectName] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const [planStart,setPlanStart] = useState(planStartString);
  const [planEnd,setPlanEnd] = useState(planEndString);
  const [teamMembers, setTeamMembers] = useState([userID]);

  const useStyles = makeStyles();
  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(userID, projectName, projectDesc);
    setProjectName('');
    setProjectDesc('');
    setPlanStart(planStartString)
    setPlanEnd(planEndString)
  };

  const userObj = state && state.users[userID];

  // This is for demonstration purposes to TJ and Veronica only. Ends at next //
  const potentialTeamMembers = [2,3,4,5,6]
  const parsedTeamMembers = potentialTeamMembers.map(id => {
    return (<TeamMember name={state.users[id].user_name} border add/>)
  });

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
              {parsedTeamMembers}
            </div>
          </div>
        </form>
      </div>
      <div class="add-project-form-buttons">
        <ConfirmButton saving handleSubmit={handleSubmit} addProject />
        <ConfirmButton cancelling close={close} />
      </div>
      <img style= {{width: '200px', marginTop: '20px', marginLeft:'140px'}}
          src="https://static.boredpanda.com/blog/wp-content/uploads/2018/12/5c24c2292938a_wegda68zn5021__700.jpg"
          alt="hehe cat"
        />
    </div>
  );
}
