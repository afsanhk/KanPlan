import React, { useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

//helpers
import avatarBGColor from '../helpers/avatarBG';

import { imageContext } from '../providers/ImagePorvider';

const useStyles = makeStyles((theme) => ({
  size: {
    width: theme.spacing(4),
    height: theme.spacing(4)
  }
}));

export default function TeamMemberName(props) {
  const classes = useStyles();

  const { imageSrc, imageUserID } = useContext(imageContext);

  let avatarBG = avatarBGColor(props.id);

  return (
    <div className="team-member-name">
      {props.id === imageUserID ? (
        <Avatar className={classes.size} src={imageSrc} style={{ 'background-color': avatarBG }} />
      ) : (
        <Avatar className={classes.size} src={`https://robohash.org/${props.id}`} style={{ 'background-color': avatarBG }} />
      )}
      {props.name && <p className={classes.name}>{props.name}</p>}
    </div>
  );
}
