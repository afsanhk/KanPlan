import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

function ConfirmButton({ saving, deleting, cancelling, consoleData, close, error, updateData }) {
  return (
    <>
      {saving && !error && (
        <Button variant="contained" color="primary" onClick={updateData}>
          Save
        </Button>
      )}
      {saving && error && (
        <Button variant="contained" color="primary" disabled>
          Save
        </Button>
      )}
      {deleting && (
        <Button variant="contained" color="secondary">
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
