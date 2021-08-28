import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  }
}));

function ConfirmButton({ saving, deleting, cancelling }) {
  return <Button variant="contained">Default</Button>;
}

export default ConfirmButton;
