import React from 'react';
import TeamMember from './TeamMember';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AddIcon from '@material-ui/icons/Add';

import './EditTaskForm.scss';

const projectNames = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 }
];

function EditTaskForm(props) {
  return (
    <div>
      <header className="task-form-header">
        <h1>Task Title</h1>
      </header>

      <div className="task-form-body">
        <div className="task-form-body-description">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta corporis voluptatem assumenda labore, sequi eos odio autem voluptates, officia incidunt ipsum tenetur aperiam! Aliquid
            accusantium quod voluptatum corrupti sint quisquam?
          </p>
        </div>

        <div className="task-form-body-dropdowns">
          <div className="task-form-body-dropdowns-project">
            <Autocomplete
              id="combo-box-demo"
              options={projectNames}
              getOptionLabel={(option) => option.title}
              style={{ width: '80%' }}
              renderInput={(params) => <TextField {...params} label="Project Title" variant="outlined" />}
            />
          </div>

          <div className="task-form-body-dropdowns-date">
            <div>
              <label>
                <h3>Start Date</h3>
                <input type="text" />
              </label>

              <label>
                <h3>End Date</h3>
                <input type="text" />
              </label>
            </div>
          </div>

          <div className="task-form-body-dropdowns-status">
            <div className="task-form-body-dropdowns-status-div">
              <Autocomplete
                id="combo-box-demo"
                options={projectNames}
                getOptionLabel={(option) => option.title}
                style={{ width: '200px' }}
                renderInput={(params) => <TextField {...params} label="Status" variant="outlined" />}
              />
              <Autocomplete
                id="combo-box-demo"
                options={projectNames}
                getOptionLabel={(option) => option.title}
                style={{ width: '200px' }}
                renderInput={(params) => <TextField {...params} label="Priority" variant="outlined" />}
              />
            </div>
          </div>
        </div>

        <div className="task-form-body-members-title">
          <div>
            <h2>Team Members</h2>
            <div className="add-button">
              <AddIcon />
            </div>
          </div>
        </div>

        <div className="task-form-body-members">
          <div className="task-form-body-members-div">
            <TeamMember name="Afsan" remove />
            <TeamMember name="Person X" remove />
            <TeamMember name="TJ" remove />
            <TeamMember name="Veronica" remove />
          </div>
        </div>
      </div>

      <footer className="task-form-footer"></footer>
    </div>
  );
}

export default EditTaskForm;
