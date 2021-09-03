import React from 'react';
import Button from '@material-ui/core/Button';

function ConfirmButton({ saving, deleting, cancelling, close, error, updateData,  deleteTaskOrProj }) {
  return (
    <>
      {saving && !error && (
        <Button variant="contained" color="primary" onClick={updateData} size='large'>
          Save
        </Button>
      )}
      {saving && error && (
        <Button variant="contained" color="primary" disabled size='large'>
          Save
        </Button>
      )}
      {deleting && (
        <Button variant="contained" color="secondary" onClick={deleteTaskOrProj} size='large'>
          Delete
        </Button>
      )}
      {cancelling && (
        <Button variant="contained" onClick={close} size='large'>
          Cancel
        </Button>
      )}
    </>
  );
}

export default ConfirmButton;
