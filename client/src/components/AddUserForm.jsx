import React from 'react';
import TeamMember from './TeamMember';

import { makeStyles } from '@material-ui/core';

// material-ui styles
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    borderRadius: '8px',
    backgroundColor: '#fcfcfc',
    border: '3px #757575 solid',
    boxShadow: theme.shadows[5],
    width: '530px',
    height: '350px',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    paddingTop: '5px',
    borderBottom: '3px solid black',
    display: 'flex',
    justifyContent: 'center'
  },
  container: {
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    maxHeight: '240px',
    overflow: 'auto'
  }
}));

function AddUserForm({ users, teamMembers, currentUsers, addUser, projectName, all }) {
  const classes = useStyles();

  const allUsers = Object.keys(users).map((key) => ({ id: users[key].id, name: users[key].user_name }));
  const allUsersWithoutCurrent = allUsers.filter((user) => !currentUsers.includes(user.id));
  const filteredIDs = teamMembers.filter((id) => !currentUsers.includes(id));
  const userIdToName = filteredIDs.map((id) => ({ id: id, name: users[id].user_name }));

  return (
    <div className={classes.paper}>
      <div className={classes.header}>
        {!all ? (
          userIdToName.length ? (
            <h2>Add user(s) from {projectName} project</h2>
          ) : (
            <h2>No more users!</h2>
          )
        ) : allUsersWithoutCurrent.length ? (
          <h2>Add users from all projects</h2>
        ) : (
          <h2>No more users!</h2>
        )}
      </div>

      <div className={classes.container}>
        {userIdToName && (all ? allUsersWithoutCurrent : userIdToName).map((user) => <TeamMember key={user.id} id={user.id} name={user.name} add border addUser={addUser} />)}
      </div>
    </div>
  );
}

export default AddUserForm;
