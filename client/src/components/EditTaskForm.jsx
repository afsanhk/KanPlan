import React from 'react';
import TeamMember from './TeamMember';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

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
        <h2>Task Title</h2>
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
            <label>
              <h3>Start Date</h3>
              <input type="text" />
            </label>

            <label>
              <h3>End Date</h3>
              <input type="text" />
            </label>
          </div>

          <div className="task-form-body-dropdowns-status">
            <Autocomplete
              id="combo-box-demo"
              options={projectNames}
              getOptionLabel={(option) => option.title}
              style={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Status" variant="outlined" />}
            />
            <Autocomplete
              id="combo-box-demo"
              options={projectNames}
              getOptionLabel={(option) => option.title}
              style={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Priority" variant="outlined" />}
            />
          </div>
        </div>

        <div className="task-form-body-members">
          <TeamMember name="Afsan" remove />
          <TeamMember name="Person X" remove />
          <TeamMember name="TJ" remove />
          <TeamMember name="Veronica" remove />
        </div>
      </div>

      <footer className="task-form-footer"></footer>
    </div>
  );
}

export default EditTaskForm;
