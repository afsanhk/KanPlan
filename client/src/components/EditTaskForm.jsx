import React from 'react';
import TeamMember from './TeamMember';

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

        <div className="task-form-body-dropdowns"></div>

        <div className="task-form-body-members">
          <TeamMember remove />
        </div>
      </div>

      <footer className="task-form-footer"></footer>
    </div>
  );
}

export default EditTaskForm;
