import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

//helpers
import { getProjectStatus } from '../helpers/selectors';

const useStyles = makeStyles({
  root: {
    width: '30%'
  },
  progressBar: {
    height: '10px',

    'border-radius': '4px',
    // border: '#3d6bb3 solid 2px',

    backgroundColor: 'rgba(189, 189, 189, 0.4)',
    color: 'red'
  }
});

export default function LinearWithValueLabel({ state, projectID }) {
  const classes = useStyles();

  const projectStatus = getProjectStatus(state, projectID);

  let projectCompletion = 0;
  if (projectStatus) {
    projectCompletion = Math.round(100 * (projectStatus.completedTasks / projectStatus.totalTasks));
  }

  function LinearProgressWithLabel(props) {
    return (
      <Box display="flex" alignItems="center">
        <Box width="100%" mr={2}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box minWidth={35}>
          <Typography variant="body2" color="textSecondary">{`${projectCompletion}%`}</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <>
      {/* {projectStatus &&  */}
      <div className={classes.root}>
        <LinearProgressWithLabel value={projectCompletion} className={classes.progressBar} />
      </div>
      {/* } */}
      {/* {!projectStatus &&
        <p>No tasks added yet!</p>
      } */}
    </>
  );
}
