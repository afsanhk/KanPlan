import {useState} from 'react';
import { TextField } from '@material-ui/core';

import ConfirmButton from './ConfirmButton';
import TeamMember from './TeamMember';

import "../styles/AddProjectForm.scss" 

export default function AddProjectForm ({state, userID, close}) {

  const [projectName, setProjectName] = useState('');
  const [projectDesc, setProjectDesc] = useState('');
  const [teamMembers, setTeamMembers] = useState([userID])

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(userID, projectName, projectDesc);
    setProjectName('')
    setProjectDesc('')
    
  }

  const userObj = state && state.users[userID];

  return (
    <div className="add-project-form-container">
      <h1 className='add-project-form-title'>Add a project</h1>
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

          <div className="add-project-form-PM">
            <h3>Project Manager</h3>
            <TeamMember name={userObj.user_name}/>
          </div>

          <div className="add-project-form-team-members">
            <h3>Choose some additional team members! --> NEED TO REUSE MODAL COMPONENTS HERE!</h3>
            <TeamMember add/>
          </div>

        </form>
          <ConfirmButton saving consoleData={handleSubmit}/>
          <ConfirmButton cancelling close={close}/>
      </div>
    </div>
  )
}
