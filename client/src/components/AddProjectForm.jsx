import React, { useEffect, useState } from 'react';
import {Drawer, Button} from '@material-ui/core';

export default function AddProjectForm () {

  const [drawerShow, setDrawerShow] = useState({right: false});

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setDrawerShow(prev => ({...prev, [anchor]: open }));
  };

  return (
    <> 
      <h1>This will show the AddProjectForm</h1>
      <p>Hue hue hue hue</p>
      <Button onClick={toggleDrawer('right', true)}>Add Project Form</Button>
      <Drawer style= {{width: '1000px'}} anchor={'right'} open={drawerShow['right']} onClose={toggleDrawer('right',false)} >AddProjectForm</Drawer>
    </>
  )
}