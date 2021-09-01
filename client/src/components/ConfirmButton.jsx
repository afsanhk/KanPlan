import React from 'react';
import Button from '@material-ui/core/Button';

function ConfirmButton({ saving, deleting, cancelling, handleSubmit, close, error, updateData, addProject, deleteSingleTask }) {
  return (
    <>
      {saving && !error && (
        <Button variant="contained" color="primary" onClick={addProject ? handleSubmit : updateData}>
          Save
        </Button>
      )}
      {saving && error && (
        <Button variant="contained" color="primary" disabled>
          Save
        </Button>
      )}
      {deleting && (
        <Button variant="contained" color="secondary" onClick={deleteSingleTask}>
          Delete
        </Button>
      )}
      {cancelling && (
        <Button variant="contained" onClick={close}>
          Cancel
        </Button>
      )}
    </>
  );
}

export default ConfirmButton;
