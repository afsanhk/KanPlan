import { useState } from 'react';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles'; //use this to customize the style

import '../styles/ProjectListItem.scss';

import LinkIconContainer from './LinkIconContainer';
import LinearWithValueLabel from './ProjectStatusBar';
import ConfirmButton from './ConfirmButton';

//For the edit and delete modals
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import DeleteTaskForm from './DeleteTaskForm';

const useStyles = makeStyles({
  icon: {
    margin: '0 2px',
    color: '#d53c3c',
    '&:hover': {
      backgroundColor: 'rgba(189, 189, 189, 0.4)'
    }
  }
});

// id is project id
export default function ProjectListItem({ project, state, deleteProject, updateProjectUsers }) {
  const id = project.id;
  const name = project.proj_name;
  const description = project.proj_description;

  const classes = useStyles();

  const [open, setOpen] = useState(false); // modal state
  const [visibility, setVisibility] = useState({ display: 'none' });

  // modal open function
  const handleOpen = () => {
    setOpen(true);
  };

  // modal close function
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <article
        className="project"
        onMouseEnter={() => {
          setVisibility({ display: 'block' });
        }}
        onMouseLeave={() => {
          setVisibility({ display: 'none' });
        }}
      >
        <header className="project-header">
          <h2>{name}</h2>
          <LinearWithValueLabel state={state} projectID={id} />
        </header>
        <p className="project-body">{description}</p>
        <footer className="project-footer">
          <div className="nav-icon-container">
            <LinkIconContainer projectID={id} text state={state} updateProjectUsers={updateProjectUsers} />
          </div>
          <div style={visibility}>
            <IconButton className={classes.icon} onClick={handleOpen} style={visibility}>
              <DeleteOutlinedIcon />
            </IconButton>
          </div>
        </footer>
      </article>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        // className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <DeleteTaskForm close={handleClose} deleteProject={deleteProject} project={project} />
        </Fade>
      </Modal>
    </>
  );
}
