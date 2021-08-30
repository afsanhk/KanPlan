import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles'; //use this to customize the style

import TeamMemberName from './TeamMemberName';
import './TeamMember.scss';

const useStyles = makeStyles({
  teamMemberButton: {
    color: '#bdbdbd'
  }
});

function TeamMember({ add, remove, name, border, removeUser, id }) {
  const classes = useStyles();

  return (
    <div className={`team-member ${border ? 'team-member-border' : ''}`}>
      <TeamMemberName name={name} />
      {add && (
        <IconButton size="small">
          <AddCircleIcon className={classes.teamMemberButton} fontSize="large" />
        </IconButton>
      )}
      {remove && (
        <IconButton size="small" onClick={() => removeUser(id)}>
          <RemoveCircleIcon className={classes.teamMemberButton} fontSize="large" />
        </IconButton>
      )}
    </div>
  );
}

export default TeamMember;
