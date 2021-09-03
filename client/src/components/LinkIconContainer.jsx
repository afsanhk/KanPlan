import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import DashboardIcon from '@material-ui/icons/Dashboard'; // Project Overview
import AssessmentIcon from '@material-ui/icons/Assessment'; // Project Gantt
import PeopleIcon from '@material-ui/icons/People';
import { makeStyles } from '@material-ui/core/styles'; //use this to customize the style
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrello } from '@fortawesome/free-brands-svg-icons';

import '../styles/LinkIconContainer.scss';
import { Backdrop, Fade, Modal } from '@material-ui/core';
import ProjectUsers from './ProjectUsers';

const useStyles = makeStyles(() => ({
  selected:{
    backgroundColor: 'rgba(189, 189, 189, 0.3)'
  },
  buttonText: {
    color: '#093170',
    height: '40px',
    padding: '10px 8px',
    'text-transform': 'none',
    'font-size': '16px'
  },
  buttonNoText: {
    'min-width': '30px',
    color: '#093170'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

export default function LinkIconContainer({ projectID, text, state, updateProjectUsers }) {
  const { pathname } = useLocation(); //extracts pathname from current url location

  console.log(pathname)
  const classes = useStyles();

  const activePage = function () {
    if (pathname.includes('/overview')) {
      return 'overview';
    }

    if (pathname.includes('/gantt')) {
      return 'gantt';
    }

    if (pathname.includes('/kanban')) {
      return 'kanban';
    }
  };

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

  return (
    <div className="nav-icons">
      <NavLink to={`/project/${projectID}/overview`} className={'iconNavLink'}>
        <Button size="small" className={[text ? classes.buttonText : classes.buttonNoText, activePage() === 'overview' ? classes.selected : '']}>
          <DashboardIcon></DashboardIcon>
          {text && <p>Overview</p>}
        </Button>
      </NavLink>
      <NavLink to={`/project/${projectID}/gantt`} className={'iconNavLink'}>
        <Button size="small" className={[text ? classes.buttonText : classes.buttonNoText, activePage() === 'gantt' ? classes.selected : '']}>
          <AssessmentIcon className="Gantt-icon" />
          {text && <p>Gantt</p>}
        </Button>
      </NavLink>
      <NavLink to={`/project/${projectID}/kanban`} className={'iconNavLink'}>
        <Button size="small" className={[text ? classes.buttonText : classes.buttonNoText, activePage() === 'kanban' ? classes.selected : '']}>
          <FontAwesomeIcon icon={faTrello} className="Kanban-icon" />
          {text && <p>Kanban</p>}
        </Button>
      </NavLink>
      {text && (
        <>
          <Button size="small" className={text ? classes.buttonText : classes.buttonNoText} onClick={handleOpen}>
            <PeopleIcon />
            <p>Users</p>
          </Button>
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
              <ProjectUsers users={state.users} project={state.projects[projectID]} closeModal={handleClose} updateProjectUsers={updateProjectUsers} />
            </Fade>
          </Modal>
        </>
      )}
    </div>
  );
}
