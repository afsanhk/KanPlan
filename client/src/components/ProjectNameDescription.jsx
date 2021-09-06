import React, { useContext } from 'react';

import AvatarGroup from '@material-ui/lab/AvatarGroup';

import LinkIconContainer from '../components/LinkIconContainer';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';

//helpers
import avatarBGColor from '../helpers/avatarBG';

import '../styles/ProjectNameDescription.scss';
import { imageContext } from '../providers/ImagePorvider';

export default function ProjectNameDescription({ proj_name, proj_description, team_members, state, projectID }) {
  const { imageSrc, imageUserID } = useContext(imageContext);

  const parsedUsers = team_members.map((user) => {
    const userDetails = state.users[user];

    let avatarBG = avatarBGColor(userDetails.id);

    return (
      <Tooltip title={userDetails.user_name}>
        {imageUserID === userDetails.id ? (
          <Avatar alt={userDetails.user_name} src={imageSrc} style={{ 'background-color': avatarBG }} />
        ) : (
          <Avatar alt={userDetails.user_name} src={`https://robohash.org/${userDetails.id}`} style={{ 'background-color': avatarBG }} />
        )}
      </Tooltip>
    );
  });

  return (
    <article className="project-name-description">
      <div className="project-name-header">
        <h3>{proj_name}</h3>
        <LinkIconContainer projectID={projectID} />
      </div>
      <p>{proj_description}</p>
      {team_members && (
        <div className="project-grouped-users">
          <AvatarGroup max={4}>{parsedUsers}</AvatarGroup>
        </div>
      )}
    </article>
  );
}
