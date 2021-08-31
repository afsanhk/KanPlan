import React from 'react';
// import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles'; //use this to customize the style

import TeamMemberName from './TeamMemberName';
import '../styles/TeamMember.scss';

const useStyles = makeStyles({
  teamMemberButton: {
    color: '#bdbdbd'
  }
});

function TeamMember({ id, name, add, remove, border, removeUser, addUser }) {
  const classes = useStyles();

  return (
    <div className={`team-member ${border ? 'team-member-border' : ''}`}>
      <TeamMemberName name={name} />
      {add && (
        <IconButton size="small" onClick={() => addUser(id)}>
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
