import React from 'react';
import Button from '@material-ui/core/Button';

function ConfirmButton({ saving, deleting, cancelling, close, error, updateData,  deleteTaskOrProj }) {
  return (
    <>
      {saving && !error && (
        <Button variant="contained" color="primary" onClick={updateData} size='large' style={{width: "110px"}}>
          Save
        </Button>
      )}
      {saving && error && (
        <Button variant="contained" color="primary" disabled size='large' style={{width: "110px"}}>
          Save
        </Button>
      )}
      {deleting && (
        <Button variant="contained" color="secondary" onClick={deleteTaskOrProj} size='large' style={{width: "110px"}}>
          Delete
        </Button>
      )}
      {cancelling && (
        <Button variant="contained" onClick={close} size='large' style={{width: "110px"}}>
          Cancel
        </Button>
      )}
    </>
  );
}

export default ConfirmButton;
