import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import './TeamMember.scss';

function TeamMember({ add, remove, name }) {
  return (
    <div className="team-member">
      <AccountCircleIcon fontSize="large" />
      <div className="team-member-name">{name}</div>
      <div className="team-member-button">
        {add && <AddIcon />}
        {remove && <RemoveIcon />}
      </div>
    </div>
  );
}

export default TeamMember;
