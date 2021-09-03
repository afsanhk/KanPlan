import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  size: {
    width: theme.spacing(4),
    height: theme.spacing(4)
  }
}));

export default function TeamMemberName(props) {
  const classes = useStyles();

  return (
    <div className="team-member-name">
      <Avatar className={classes.size} />
      {props.name && <p className={classes.name}>{props.name}</p>}
    </div>
  );
}
