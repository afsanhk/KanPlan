import React, { useEffect, useState } from 'react';

// components
import ConfirmButton from './ConfirmButton';
import TeamMember from './TeamMember';
import AddUserForm from './AddUserForm';

// material-ui cores
import { Backdrop, Fade, IconButton, makeStyles, Modal } from '@material-ui/core';

// material-ui icons
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CloseIcon from '@material-ui/icons/Close';

// scss
import '../styles/ProjectUsers.scss';
import axios from 'axios';

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
  },
  closeButton: {
    position: 'absolute',
    top: '35px',
    right: '35px'
  }
}));

function ProjectUsers({ users, project, closeModal, updateProjectUsers }) {
  const classes = useStyles();

  const [teamMembers, setTeamMembers] = useState(project.team_members);
  const [currentUsers, setCurrentUsers] = useState(project.team_members);
  const [userState, setUserState] = useState({});

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
      setUserState((prev) => ({ ...prev, team_members: newUsers }));
      return newUsers;
    });
  };

  // add user to project users
  const addUser = (user_id) => {
    setCurrentUsers((prev) => {
      const newUsers = [...prev, user_id];
      setUserState((prev) => ({ ...prev, team_members: newUsers }));
      return newUsers;
    });
  };

  const updateData = () => {
    // console.log(userState);
    if (currentUsers.length < project.team_members.length) {
      const deletedMembers = project.team_members.filter(function (el) {
        return currentUsers.indexOf(el) < 0;
      });
      const deletedTasks = deletedMembers.map((memberID) => {
        return users[memberID].user_tasks.filter((taskID) => project.project_tasks.includes(taskID));
      });
      axios
        .put(`http://localhost:8001/api/member/project/${project.id}`, { team_members: currentUsers, deleted_members: deletedMembers, deleted_tasks: deletedTasks })
        .catch((error) => console.log(error));
    } else {
      axios.put(`http://localhost:8001/api/member/project/${project.id}`, { team_members: currentUsers }).catch((error) => console.log(error));
    }
    currentUsers.forEach((userID) => {
      // filter the unique project id
      const updatedUserProjects = [...users[userID].user_projects, project.id].filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
      // console.log('project_id: ', project.id, 'user_id: ', userID, 'team_members: ', currentUsers, 'user_projects: ', updatedUserProjects);
      updateProjectUsers(project.id, userID, project.team_members, currentUsers, updatedUserProjects);
    });
    closeModal();
  };

  useEffect(() => {
    setUserState((prev) => ({ ...prev, team_members: currentUsers }));
  }, []);

  return (
    <div className="project-users">
      <header className="project-users-header">
        <h1>Users</h1>
        <IconButton size="small" onClick={closeModal} className={classes.closeButton}>
          <CloseIcon />
        </IconButton>
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
          <h2>Team Members</h2>
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
        <ConfirmButton saving updateData={updateData} />
      </footer>
    </div>
  );
}

export default ProjectUsers;
