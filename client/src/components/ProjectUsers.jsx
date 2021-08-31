import React, { useEffect, useState } from 'react';

// components
import ConfirmButton from './ConfirmButton';
import TeamMember from './TeamMember';

// material-ui cores
import { Backdrop, Fade, IconButton, makeStyles, Modal } from '@material-ui/core';

// material-ui icons
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddUserForm from './AddUserForm';

// scss
import '../styles/ProjectUsers.scss';

// material-ui styles
const useStyles = makeStyles((theme) => ({
  teamMemberButton: {
    color: '#bdbdbd'
  },
  icon: {
    margin: '5px'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

function ProjectUsers({ users, project }) {
  const classes = useStyles();

  const [teamMembers, setTeamMembers] = useState(project.team_members);
  const [currentUsers, setCurrentUsers] = useState(project.team_members);
  const [state, setState] = useState({});

  const managerId = teamMembers.filter((id) => id === project.manager_id)[0];

  // modal state
  const [open, setOpen] = React.useState(false);

  // modal open function
  const handleOpen = () => {
    setOpen(true);
  };

  // modal close function
  const handleClose = () => {
    setOpen(false);
  };

  // remove user project users
  const removeUser = (user_id) => {
    setCurrentUsers((prev) => {
      const newUsers = [...prev].filter((id) => id !== user_id);
      setState((prev) => ({ ...prev, team_members: newUsers }));
      return newUsers;
    });
  };

  // add user to project users
  const addUser = (user_id) => {
    setCurrentUsers((prev) => {
      const newUsers = [...prev, user_id];
      setState((prev) => ({ ...prev, team_members: newUsers }));
      return newUsers;
    });
  };

  // console log function
  const consoleData = () => {
    setState((prev) => ({ ...prev, team_members: currentUsers }));
    console.log(state);
  };

  useEffect(() => {
    setState((prev) => ({ ...prev, team_members: currentUsers }));
  }, []);

  return (
    <div className="project-users">
      <header className="project-users-header">
        <h1>Users</h1>
      </header>

      <div className="project-users-body">
        <div className="project-users-body-div">
          {currentUsers.includes(managerId) && (
            <>
              <div className="project-users-body-manager">Project Manager:</div>
              <TeamMember id={managerId} name={users[managerId].user_name} border />
            </>
          )}
        </div>
        <div className="project-users-body-users">
          <div className="project-users-body-users-div">
            {currentUsers.map((id, index) => (
              <>{id !== managerId && <TeamMember key={index} id={id} name={users[id].user_name} remove border removeUser={removeUser} />}</>
            ))}
          </div>
          <div className="project-users-body-add-user">
            <div className="project-users-body-add-user-div">
              <IconButton size="small" onClick={handleOpen}>
                <AddCircleIcon className={classes.teamMemberButton} fontSize="large" />
              </IconButton>
              <p>Add new user</p>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500
                }}
              >
                <Fade in={open}>
                  <AddUserForm users={users} teamMembers={teamMembers} currentUsers={currentUsers} addUser={addUser} all />
                </Fade>
              </Modal>
            </div>
          </div>
        </div>
      </div>

      <footer className="project-users-footer">
        <ConfirmButton saving consoleData={consoleData} />
      </footer>
    </div>
  );
}

export default ProjectUsers;