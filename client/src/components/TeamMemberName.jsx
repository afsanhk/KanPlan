import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
      
export default function TeamMemberName(props) {
  
  return (
    <div className="team-member-name">
      <AccountCircleIcon fontSize="large" />
      {props.name && <p>{props.name}</p>}
    </div>
  )
}
      