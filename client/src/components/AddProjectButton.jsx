import React, { useState } from 'react';
import {Drawer, Button, makeStyles, TextField} from '@material-ui/core';
import AddIcon from "@material-ui/icons/Add";

import "../styles/AddProjectButton.scss"
import AddProjectForm from './AddProjectForm';

export default function AddProjectButton ({state, userID}) {

  const [drawerShow, setDrawerShow] = useState({right: false});

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setDrawerShow(prev => ({...prev, [anchor]: open }));
  };

  const useStyles = makeStyles({
    newProjectButton: {
      backgroundColor: '#3d6bb3',
      color: '#fcfcfc',
      '&:hover': {
        backgroundColor: '#1e88e5',
      }
    }
  }) 

  const classes = useStyles();

  return (
    <> 
      <Button
          variant='contained'
          startIcon={<AddIcon />}
          className={classes.newProjectButton}
          onClick={toggleDrawer('right', true)}
        >
          New Project
      </Button>
      <Drawer style= {{width: '1000px'}} anchor={'right'} open={drawerShow['right']} onClose={toggleDrawer('right',false)}>
        <AddProjectForm state={state} userID={userID} />
      </Drawer>
    </>
  )
}