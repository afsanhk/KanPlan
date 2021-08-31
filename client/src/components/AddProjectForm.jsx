import {useState} from 'react';
import { TextField, Button } from '@material-ui/core';

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
  }

  const userObj = state && state.users[userID];

  return (
    <div className="add-project-form-container">
      <h1 className='add-project-form-title'>Add a project</h1>
      <div className="add-project-form-body">
        <form className="add-project-form" onSubmit={handleSubmit}>
          <TextField 
            id="standard-full-width"
            label="Project Name"
            style={{ margin: 8 }}
            placeholder="Write project name here..."
            multiline
            margin="normal"
            onChange={(event) => setProjectName(event.target.value)}
          />

          <TextField 
            id="standard-full-width"
            label="Project Description"
            style={{ margin: 8 }}
            placeholder="Write project name here..."
            multiline
            margin="normal"
            onChange={(event) => setProjectDesc(event.target.value)}
          />

          <span className="add-project-form-PM">
            <h3>Project Manager</h3>
            <TeamMember name={userObj.user_name}/>
          </span>
        </form>
        <Button type="submit">
          <ConfirmButton saving consoleData={() => console.log("Something should happen!")}/>
        </Button>
        <Button>
          <ConfirmButton cancelling close={close}/>
        </Button>
      </div>
    </div>
  )
}
