import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

function ConfirmButton({ saving, deleting, cancelling, consoleData }) {
  return (
    <>
      {saving && (
        <Button variant="contained" color="primary" onClick={consoleData}>
          Save
        </Button>
      )}
      {deleting && (
        <Button variant="contained" color="secondary">
          Delete
        </Button>
      )}
      {cancelling && <Button variant="contained">Cancel</Button>}
    </>
  );
}

export default ConfirmButton;
